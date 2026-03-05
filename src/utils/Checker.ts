const Checker = {
    empty: (val: any): boolean =>
        val === null || 
        val === undefined || 
        (typeof val === 'string' && val.trim().length === 0) || 
        (Array.isArray(val) && val.length === 0),
    email: (email: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
} as const;
export { Checker };