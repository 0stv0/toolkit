import { CipherGCM, CipherGCMOptions, Cipheriv, createCipheriv, createDecipheriv, DecipherGCM, randomBytes } from "node:crypto";

interface Props
{
    secret: string;
    ivLength?: number;
    tagLength?: number;
};
class AES
{
    private readonly algo: string = "aes-256-gcm";

    private readonly secret: Buffer;
    private readonly ivLength: number;
    private readonly tagLength: number;

    constructor(props: Props)
    {
        this.secret    = Buffer.alloc(32, props.secret);
        this.ivLength  = props.ivLength ?? 12;
        this.tagLength = props.tagLength ?? 16;
    };
    public encode = (plain: string): string =>
    {
        let iv: Buffer             = randomBytes(this.ivLength);
        let opts: CipherGCMOptions = {authTagLength: this.tagLength};
        let cipher: CipherGCM      = createCipheriv(this.algo, this.secret, iv, opts) as CipherGCM;
        
        let encrypted: Buffer = Buffer.concat([
            cipher.update(plain, "utf8"),
            cipher.final()
        ]);
        let tag: Buffer = cipher.getAuthTag();
        return Buffer.concat([iv, tag, encrypted]).toString("base64");
    };
    public decode = (encoded: string): string | null =>
    {
        try
        {
            let buffer: Buffer = Buffer.from(encoded, "base64");
            
            let iv: Buffer   = buffer.subarray(0, this.ivLength);
            let tag: Buffer  = buffer.subarray(this.ivLength, this.ivLength + this.tagLength);
            let data: Buffer = buffer.subarray(this.ivLength + this.tagLength);

            let decipher: DecipherGCM = createDecipheriv(this.algo, this.secret, iv) as DecipherGCM;
            decipher.setAuthTag(tag);

            let decrypted: Buffer = Buffer.concat([
                decipher.update(data),
                decipher.final()
            ]);
            return decrypted.toString("utf8");
        }
        catch
        {
            return null;
        }
    };
};
export { AES };