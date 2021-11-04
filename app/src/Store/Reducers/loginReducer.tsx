export const ACTION_TYPES = {
    FAILED_TO_LOG: 'failed_to_login',
    LOG_SUCCESS: 'login_success',
    DISABLE_LOG_ERROR: 'disable_log_error',
}

const INITIAL_STATE = {
    msg: "",
    error: false
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.FAILED_TO_LOG:
            return {...state, msg: action.msg, error: true};
        case ACTION_TYPES.LOG_SUCCESS:
            return {...state, error: false};
        case ACTION_TYPES.DISABLE_LOG_ERROR:
            return {...state, msg: "", error: false};
        default:
            return state;
    }
};