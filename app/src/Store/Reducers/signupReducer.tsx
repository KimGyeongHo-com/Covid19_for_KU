export const ACTION_TYPES = {
    FAILED_TO_SIGN: 'failed_to_signup',
    SIGN_SUCCESS: 'signup_success',
    DISABLE_SIGN_ERROR: 'disable_sign_error',
}

const INITIAL_STATE = {
    msg: "",
    error: false
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.FAILED_TO_SIGN:
            return {...state, msg: action.msg, error: true};
        case ACTION_TYPES.SIGN_SUCCESS:
            return {...state, error: false};
        case ACTION_TYPES.DISABLE_SIGN_ERROR:
            return {...state, msg: "", error: false};
        default:
            return state;
    }
};