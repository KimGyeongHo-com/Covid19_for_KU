export const ACTION_TYPES = {
    FAILED_TO_FACILITIES: 'failed_to_facilities',
    FACILITIES_SUCCESS: 'facilities_success',
    DISABLE_FACILITIES_ERROR: 'disable_facilities_error',
}

const INITIAL_STATE = {
    msg: "",
    error: false,
    facilities: []
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.FAILED_TO_FACILITIES:
            return {...state, msg: action.msg, error: true};
        case ACTION_TYPES.FACILITIES_SUCCESS:
            return {...state, error: false, facilities: action.facilities};
        case ACTION_TYPES.DISABLE_FACILITIES_ERROR:
            return {...state, msg: "", error: false};
        default:
            return state;
    }
};