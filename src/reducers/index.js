import { combineReducers } from 'redux';
import { userLoginReducer } from './userReducers';

export const rootReducer = combineReducers({
  userLogin: userLoginReducer,
});
