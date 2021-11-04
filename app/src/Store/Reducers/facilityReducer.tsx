export const ACTION_TYPES = {
    FAILED_TO_FACILITY: 'failed_to_facility',
    FACILITY_SUCCESS: 'facility_success',
    DISABLE_FACILITY_ERROR: 'disable_facility_error',
}

const INITIAL_STATE = {
    msg: "",
    error: false,
    facility: {}
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.FAILED_TO_FACILITY:
            return {...state, msg: action.msg, error: true};
        case ACTION_TYPES.FACILITY_SUCCESS:
            return {...state, error: false, facility: action.facility};
        case ACTION_TYPES.DISABLE_FACILITY_ERROR:
            return {...state, msg: "", error: false};
        default:
            return state;
    }
};