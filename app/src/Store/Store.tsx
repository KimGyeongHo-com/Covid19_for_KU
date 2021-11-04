import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import loginReducer from './Reducers/loginReducer';
import signupReducer from './Reducers/signupReducer';
import userReducer from './Reducers/userReducer';
import facilityReducer from './Reducers/facilityReducer';
import facilitiesReducer from './Reducers/facilitiesReducer';
import newsReducer from './Reducers/newsReducer';

const reducers = combineReducers({
    loginReducer,
    signupReducer,
    userReducer,
    facilityReducer,
    facilitiesReducer,
    newsReducer
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));