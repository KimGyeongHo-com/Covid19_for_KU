import  { ACTION_TYPES } from '../Store/Reducers/facilityReducer';
import FacilityService from '../Services/Facility/FacilityService';

export const getFacility = (name: string, token: string) => {
    return (dispatch: any) => {

        let service = new FacilityService();
        let retValue = service.getFacility({name: name, token: token}).then((value: any) => {
            facilitySucceed(dispatch, value);
            return (0);
        }).catch((error: any) => {
            let errorMsg = error.message;

            sendError(dispatch, errorMsg);
            return (1);
        })

        return (retValue);
    }
}

const sendError = (dispatch: any, error: string) => {
    setTimeout(() => {
        disableFacilityError(dispatch);
    }, 10000);
    facilityFailed(dispatch, error);
}

const disableFacilityError = (dispatch: any) => {
    dispatch({
        type: ACTION_TYPES.DISABLE_FACILITY_ERROR,
        msg: "",
    });
}

const facilityFailed = (dispatch: any, error: string) => {
    dispatch({
        type: ACTION_TYPES.FAILED_TO_FACILITY,
        msg: error,
    });
}

const facilitySucceed = (dispatch: any, result: any) => {
    dispatch({
        type: ACTION_TYPES.FACILITY_SUCCESS,
        facility: result.facility
    });
}
