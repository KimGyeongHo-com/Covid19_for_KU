import AbstractService from '../Ajax/AbstractService';
import { IServerResponse } from '../Ajax/IServerResponse';
import { apiRoot } from '../apiRoot';
class BookingService extends AbstractService {

    public async bookFacility(name: string, from: string, to: string, token: string): Promise<string | {success: boolean}> {
        return this.request({
            method: 'POST',
            url: apiRoot + 'book_facility',
            json: {
                token,
                name,
                _from: from,
                to
            },
        }).then((responseData: Response | null) => {
            if (responseData == null)
                return Promise.reject();
            if (!responseData.ok)
                throw responseData.json();

            return responseData.json()
            .then((value: IServerResponse) => {
                if (value == null || !value.success)
                    Promise.reject(value);
                return value.message;
            });
        });
    }

}

export default BookingService;