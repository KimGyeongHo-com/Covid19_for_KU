import Ajax from './Ajax';
import AjaxOptions from './AjaxOptionsInterface';

class AbstractService {
    request(options: AjaxOptions) {
        return Ajax.call(options)
    }
}

export default AbstractService;
