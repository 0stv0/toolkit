interface Props
{
    sid?: string;
    user: string | number;
    valid: boolean;
    isNew: boolean;
};
class SessionCore 
{
    protected readonly sid: string;
    protected readonly user: string | number;
    protected valid: boolean;
    constructor(props: Props)
    {
        if (!props.isNew && !props.sid)
            throw new Error("No sid in old session");
        this.sid   = props.isNew ? crypto.randomUUID() : props.sid as string;
        this.user  = props.user;
        this.valid = props.valid;
    };
    public getSid  = (): string => this.sid;
    public getUser = (): string | number => this.user;
    public isValid = (): boolean => this.valid;

    public revoke = () => this.valid = false;
};
export { SessionCore };