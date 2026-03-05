const getTime = (): string => new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

const Logger = {
    info: (msg: any): void => console.log(`\x1b[36m[${getTime()}] INFO:\x1b[0m ${msg}`),
    warn: (msg: any): void => console.log(`\x1b[33m[${getTime()}] WARN:\x1b[0m ${msg}`),
    error: (msg: any): void => console.log(`\x1b[31m[${getTime()}] ERROR:\x1b[0m ${msg}`)
} as const;
export { Logger };