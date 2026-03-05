import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Checker } from "./Checker.js";
import { Logger } from "./Logger.js";

type TYPE = 'env' | 'envprod' | 'envlocal';
const NAMES: Record<TYPE, string> = {
    env: '.env',
    envprod: '.env.production',
    envlocal: '.env.local'
};
const loadData = (type: TYPE, path: string) =>
{
    let content: string = readFileSync(path, "utf8");
    let lines: string[] = content.split(/\r?\n/);

    let count: number = 0;
    for (let line of lines)
    {
        let trimmed: string = line.trim();
        if (!trimmed || trimmed.startsWith("#"))
            continue;
        let parts: string[] = line.split("=");
        if (parts.length !== 2 || Checker.empty(parts[1]))
            continue;
        let key: string   = parts[0] as string;
        let value: string = parts[1] as string;
        process.env[key]  = value;
        count++;
    };
    Logger.info(`Loaded ${count} items from ${NAMES[type]}`);
};
const env = {
    load: (): void =>
    {
        let glob: string  = resolve(process.cwd(), ".env");
        let prod: string  = resolve(process.cwd(), ".env.production");
        let local: string = resolve(process.cwd(), ".env.local");
        if (existsSync(glob))
            loadData('env', glob);
        if (existsSync(prod))
            loadData('envprod', prod);
        if (existsSync(local))
            loadData('envlocal', local);
    },
    get: <T extends string | number | boolean>(key: string, fallback: T): T =>
    {
        let val: string | undefined = process.env[key];
        if (!val || Checker.empty(val))
            return fallback;

        if (typeof fallback === 'number')
            return Number(val) as T;
        if (typeof fallback === 'boolean')
            return (val.toLocaleLowerCase() === "true") as T;

        return val as T;
    }
} as const;
export { env };