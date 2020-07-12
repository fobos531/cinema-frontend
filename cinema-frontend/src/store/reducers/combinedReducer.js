import authReducer from './authReducer'
import { combineReducers } from 'redux';

const combinedReducer = combineReducers({
  authenticationState: authReducer
});

export default combinedReducer
