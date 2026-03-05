import { decode } from "@toon-format/toon";
import { RequestProps } from "./JsonRequests.js";

const buildHeaders = (props: RequestProps, isJson: boolean): Record<string, string> =>
{
    let headers: Record<string, string> = {...props.headers};
    if (props.auth)
        headers['Authorization'] = `Bearer ${props.auth}`;
    if (isJson)
        headers['Content-Type'] = 'application/json';
    return headers;
};
const ToonRequests = {
    get: async<T = any>(props: RequestProps): Promise<T | null> =>
    {
        try
        {
            let res: Response = await fetch(props.url, {
                method: 'GET',
                headers: buildHeaders(props, false)
            });
            let raw: string = await res.text();
            return decode(raw) as T;
        }
        catch
        {
            return null;
        }
    },
    delete: async<T = any>(props: RequestProps): Promise<T | null> =>
    {
        try
        {
            let res: Response = await fetch(props.url, {
                method: 'DELETE',
                headers: buildHeaders(props, false)
            });
            let raw: string = await res.text();
            return decode(raw) as T;
        }
        catch
        {
            return null;
        }
    },
    post: async<T = any>(props: RequestProps): Promise<T | null> =>
    {
        try
        {
            let res: Response = await fetch(props.url, {
                method: 'POST',
                headers: buildHeaders(props, true),
                body: JSON.stringify(props.body ?? {})
            });
            let raw: string = await res.text();
            return decode(raw) as T;
        }
        catch
        {
            return null;
        }
    },
    put: async<T = any>(props: RequestProps): Promise<T | null> =>
    {
        try
        {
            let res: Response = await fetch(props.url, {
                method: 'PUT',
                headers: buildHeaders(props, true),
                body: JSON.stringify(props.body ?? {})
            });
            let raw: string = await res.text();
            return decode(raw) as T;
        }
        catch
        {
            return null;
        }
    },
} as const;

export { ToonRequests, type RequestProps };