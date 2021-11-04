import queryString from 'query-string';

interface AjaxOptions {
    responseType?: string;
    url: string;
    method?: string;
    headers?: Headers | {};
    json?: object;
    params?: Record<string, string | number | boolean | queryString.Stringifiable[] | null | undefined>;
    data?: Record<string, string | number | boolean | queryString.Stringifiable[] | null | undefined>;
}

export default AjaxOptions;