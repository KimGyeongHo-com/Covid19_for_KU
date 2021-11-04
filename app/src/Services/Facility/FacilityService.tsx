import Facility from '../../Containers/Facility';
import AbstractService from '../Ajax/AbstractService';
import { apiRoot } from '../apiRoot';

class FacilityService extends AbstractService {

    public getFacilities(options: any) {
        return this.request({
            method: 'POST',
            url: apiRoot + 'get_facilities',
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

    public getFacility(options: any) {
        return this.request({
            method: 'POST',
            url: apiRoot + 'get_facility_info',
            json: {
                token: options.token,
                name: options.name
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

export default FacilityService;