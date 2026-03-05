import { createHmac, timingSafeEqual } from "node:crypto";

interface JwtPayload
{
    [key: string]: string | number | boolean;
    exp: number;
    iat: number;
};
class JWT
{
    private readonly secret: string;
    constructor(secret: string)
    {
        this.secret = secret;
    };
    private compare = (a: string, b: string): boolean =>
    {
        let bufA: Buffer = Buffer.from(a);
        let bufB: Buffer = Buffer.from(b);
        if (bufA.length !== bufB.length)
            return false;
        return timingSafeEqual(bufA, bufB);
    };
    private toBase64 = (obj: object | Buffer): string =>
    {
        let str: string = Buffer.isBuffer(obj) ?
            obj.toString("base64") :
            Buffer.from(JSON.stringify(obj)).toString("base64");
        return str.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    };
    public sign = (payload: object, expTime: number): string =>
    {
        let header: object = {alg: "HS256", type: "JWT"};
        let now: number    = Math.floor(Date.now() / 1000);

        let jPayload: JwtPayload = {
            ...payload as JwtPayload,
            exp: now + expTime,
            iat: now
        };
        let encodedHeader: string  = this.toBase64(header);
        let encodedPayload: string = this.toBase64(jPayload);

        let signature: Buffer = createHmac("sha256", this.secret)
            .update(`${encodedHeader}.${encodedPayload}`)
            .digest();
        return `${encodedHeader}.${encodedPayload}.${this.toBase64(signature)}`;
    };
    public decode = (token: string): JwtPayload | null =>
    {
        let parts: string[] = token.split(".");
        if (parts.length !== 3)
            return null;

        let [header, payload, signature] = parts;
        let expected: string             = this.toBase64(
            createHmac("sha256", this.secret).update(`${header}.${payload}`).digest()
        );
        if (!this.compare(signature as string, expected))
            return null;
        try
        {
            let decoded: JwtPayload = JSON.parse(
                Buffer.from(payload as string, "base64").toString("utf8")
            );
            if (decoded.exp < Math.floor(Date.now() / 1000))
                return null;
            return decoded;
        }
        catch
        {
            return null;
        }
    };
};
export { JWT, type JwtPayload };