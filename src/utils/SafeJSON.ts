const SafeJSON = {
    parse: <T = any>(json: string): T | null =>
    {
        try { return JSON.parse(json) as T; }
        catch { return null; };
    },
    stringify: (data: any): string | null =>
    {
        try { return JSON.stringify(data); }
        catch { return null; };
    }
} as const;
export { SafeJSON };