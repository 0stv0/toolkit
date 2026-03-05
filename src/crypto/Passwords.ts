import { randomBytes, ScryptOptions, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LEN: number            = 64;
const SCRYPT_OPTS: ScryptOptions = {N: 16384, r: 8, p: 1};

const Passwords = {
    hash: (plain: string): string =>
    {
        let salt: string = randomBytes(16).toString("hex");
        let key: Buffer  = scryptSync(plain, salt, KEY_LEN, SCRYPT_OPTS);
        return `${salt}:${key.toString("hex")}`;
    },
    verify: (plain: string, hash: string): boolean =>
    {
        let parts: string[] = hash.split(":");
        if (parts.length !== 2)
            return false;

        let [salt, hashed] = parts;
        let buffer: Buffer = Buffer.from(hashed as string, "hex");
        let key: Buffer    = scryptSync(plain, salt as string, KEY_LEN, SCRYPT_OPTS);
        return timingSafeEqual(buffer, key);
    }
} as const;
export { Passwords };