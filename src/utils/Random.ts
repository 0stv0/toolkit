import { randomBytes, randomInt } from "node:crypto";

const Random = {
    code: ({length, result}: {length: number, result: 'num' | 'str'}): number[] | string =>
    {
        let arr: number[] = [];
        let res: string   = "";
        for (let i = 0; i < length; i++)
            if (result === 'num')
                arr[arr.length] = randomInt(0, 10);
            else
                res += randomInt(0, 10).toString();
        return result === 'num' ? arr : res;
    },
    string: ({length}: {length: number}): string => randomBytes(length).toString("hex").slice(0, length)
} as const;
export { Random };