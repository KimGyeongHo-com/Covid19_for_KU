import  { ACTION_TYPES } from '../Store/Reducers/newsReducer';
import NewsService from '../Services/News/NewsService';

export const getNews = (token: string) => {
    return (dispatch: any) => {

        let service = new NewsService();
        let retValue = service.getNews({token: token}).then((value: any) => {
            newsSucceed(dispatch, value);
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
        disableNewsError(dispatch);
    }, 10000);
    newsFailed(dispatch, error);
}

const disableNewsError = (dispatch: any) => {
    dispatch({
        type: ACTION_TYPES.DISABLE_NEWS_ERROR,
        msg: "",
    });
}

const newsFailed = (dispatch: any, error: string) => {
    dispatch({
        type: ACTION_TYPES.FAILED_TO_NEWS,
        msg: error,
    });
}

const newsSucceed = (dispatch: any, result: any) => {
    dispatch({
        type: ACTION_TYPES.NEWS_SUCCESS,
        news: result.news
    });
}