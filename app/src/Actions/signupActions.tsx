import  { ACTION_TYPES } from '../Store/Reducers/signupReducer';
import  { INFO_TYPES } from '../Store/Reducers/userReducer';
import SignupService from '../Services/LoginSignup/SignupService';

export const signUp = (email: string, password: string, confirmPassword: string) => {
    return (dispatch: any) => {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!email) {
            sendError(dispatch, "Email is missing");
            return (1);
        } else if (!reg.test(email)) {
            sendError(dispatch, "Email is invalid");
            return (1);
        } else if (!password) {
            sendError(dispatch, "Password is missing");
            return (1);
        } else if (!confirmPassword) {
            sendError(dispatch, "Confirm Password is missing");
            return (1);
        } else if (password !== confirmPassword) {
            sendError(dispatch, "Password and Confirm password are different");
            return (1);
        }

        let service = new SignupService();
        let retValue = service.signUp({email: email, password: password}).then((value: any) => {
            signSucceed(dispatch);
            dispatch({
                type: INFO_TYPES.CONNECT,
                token: value.token
            });
            return (0);            return (0);
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
        disableSignError(dispatch);
    }, 10000);
    signFailed(dispatch, error);
}

const disableSignError = (dispatch: any) => {
    dispatch({
        type: ACTION_TYPES.DISABLE_SIGN_ERROR,
        msg: "",
    });
}

const signFailed = (dispatch: any, error: any) => {
    dispatch({
        type: ACTION_TYPES.FAILED_TO_SIGN,
        msg: error,
    });
}

const signSucceed = (dispatch: any) => {
    dispatch({
        type: ACTION_TYPES.SIGN_SUCCESS,
    });
}