import AbstractService from '../Ajax/AbstractService';
import { apiRoot } from '../apiRoot';

class SignupService extends AbstractService {

    signUp(options: any) {
        return this.request({
            method: 'POST',
            url: apiRoot + 'register',
            json: {
                password: options.password,
                email: options.email
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
        })
    }
}

export default SignupService;