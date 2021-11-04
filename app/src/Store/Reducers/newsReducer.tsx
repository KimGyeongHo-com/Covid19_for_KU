export const ACTION_TYPES = {
    FAILED_TO_NEWS: 'failed_to_news',
    NEWS_SUCCESS: 'news_success',
    DISABLE_NEWS_ERROR: 'disable_news_error',
}

const INITIAL_STATE = {
    msg: "",
    error: false,
    news: []
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.FAILED_TO_NEWS:
            return {...state, msg: action.msg, error: true};
        case ACTION_TYPES.NEWS_SUCCESS:
            return {...state, error: false, news: action.news};
        case ACTION_TYPES.DISABLE_NEWS_ERROR:
            return {...state, msg: "", error: false};
        default:
            return state;
    }
};