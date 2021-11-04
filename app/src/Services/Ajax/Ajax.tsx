import queryString from 'query-string';
import AjaxOptions from './AjaxOptionsInterface';

class Ajax {

    _appendQuery(uri: string, query: Record<string, string | number | boolean | queryString.Stringifiable[] | null | undefined>) {
        let querystring = queryString.stringify(query);
        let prefix = (uri.indexOf('?') === -1) ? '?' : '&';

        return (uri + prefix + querystring);
    }

    call(options: AjaxOptions) {
        let responseType = options.responseType || 'json';
        let fetchUrl = options.url;
        let fetchOptions = {
            method: options.method || 'GET',
            headers: new Headers(options.headers || {}),
            body: ""
        };

        if (responseType === 'json')
            fetchOptions.headers.append('Accept', 'application/json');
        if (options.params)
            fetchUrl = this._appendQuery(fetchUrl, options.params);

        if (typeof options.json === 'object') {
            fetchOptions.headers.append('Content-Type', 'application/json');
            fetchOptions.body = JSON.stringify(options.json);
        } else if (typeof options.data === 'object') {
            fetchOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            fetchOptions.body = queryString.stringify(options.data);
        }

        return fetch(fetchUrl, fetchOptions).then((response) => {
            if (responseType === 'json')
                return response;
            return null;
        }).catch((err) => {
            throw err;
        });
    }
}

export default new Ajax();
