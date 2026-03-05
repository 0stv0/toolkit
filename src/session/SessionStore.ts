import { SessionCore } from "./SessionCore.js";

abstract class SessionStore<T extends SessionCore>
{
    public abstract load(): this | Promise<this>;
    public abstract add(): boolean | Promise<boolean>;
    public abstract remove(): boolean | Promise<boolean>;
    public abstract get(): T | undefined | Promise<T | undefined>;
    public abstract getAll(): T[] | Promise<T[]>;
};
export { SessionStore };