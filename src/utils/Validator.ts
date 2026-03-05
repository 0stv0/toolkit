type Rule = {
    checker: (v: any) => boolean,
    required: boolean,
    errorMsg: string
};
type Schema = Record<string, Rule[]>;

const Validator = {
    validate: (data: any, schema: Schema): Record<string, string[]> =>
    {
        let errors: Record<string, string[]> = {};
        for (let key in schema)
        {
            let value: any    = data[key];
            let rules: Rule[] = schema[key] ?? [];

            let itemErrors: string[] = [];
            for (let rule of rules)
            {
                let exists: boolean = value !== undefined && value !== null && value !== "";
                if (rule.required && !exists)
                    itemErrors.push(rule.errorMsg);
                if (exists && !rule.checker(value))
                    itemErrors.push(rule.errorMsg);
            };
            if (itemErrors.length > 0)
                errors[key] = itemErrors;
        };
        return errors;
    }
} as const;

export { type Rule, type Schema, Validator };