import AbstractService from '../Ajax/AbstractService';
import { apiRoot } from '../apiRoot';

class NewsService extends AbstractService {

    public getNews(options: any) {
        return this.request({
            method: 'POST',
            url: apiRoot + 'get_news',
            json: {
                token: options.token,
            },
        }).then(responseData => {
            if (responseData === null)
                return null;
            if (responseData.ok) {
                return responseData.json().then((value : any) => {
                    if (value.success)
                        return value;
                    else
                        throw value;
                });
            }
            throw responseData.json();
        });
    }
}

export default NewsService;