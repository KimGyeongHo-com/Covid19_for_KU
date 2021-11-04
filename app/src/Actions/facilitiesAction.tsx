import  { ACTION_TYPES } from '../Store/Reducers/facilitiesReducer';
import FacilityService from '../Services/Facility/FacilityService';

export const getFacilities = (token: string) => {
    return (dispatch: any) => {

        let service = new FacilityService();
        let retValue = service.getFacilities({token: token}).then((value: any) => {
            facilitiesSucceed(dispatch, value);
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
        disableFacilitiesError(dispatch);
    }, 10000);
    facilitiesFailed(dispatch, error);
}

const disableFacilitiesError = (dispatch: any) => {
    dispatch({
        type: ACTION_TYPES.DISABLE_FACILITIES_ERROR,
        msg: "",
    });
}

const facilitiesFailed = (dispatch: any, error: string) => {
    dispatch({
        type: ACTION_TYPES.FAILED_TO_FACILITIES,
        msg: error,
    });
}

const facilitiesSucceed = (dispatch: any, result: any) => {
    dispatch({
        type: ACTION_TYPES.FACILITIES_SUCCESS,
        facilities: result.facilities
    });
}