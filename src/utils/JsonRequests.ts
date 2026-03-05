interface RequestProps
{
    url: string;
    auth?: string;
    headers?: Record<string, string>;
    body?: Record<string, any>
};
const buildHeaders = (props: RequestProps, isJson: boolean): Record<string, string> =>
{
    let headers: Record<string, string> = {...props.headers};
    if (props.auth)
        headers['Authorization'] = `Bearer ${props.auth}`;
    if (isJson)
        headers['Content-Type'] = 'application/json';
    return headers;
};
const JsonRequests = {
    get: async<T = any>(props: RequestProps): Promise<T | null> =>
    {
        try
        {
            let res: Response = await fetch(props.url, {
                method: 'GET',
                headers: buildHeaders(props, false)
            });
            let data: T = await res.json();
            return data;
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
            let data: T = await res.json();
            return data;
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
            let data: T = await res.json();
            return data;
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
            let data: T = await res.json();
            return data;
        }
        catch
        {
            return null;
        }
    },
} as const;

export { JsonRequests, type RequestProps };