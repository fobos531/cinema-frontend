import authReducer from './authReducer'
import cinemaReducer from './cinemaReducer'
import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import userReducer from './userReducer';
import screeningTimeReducer from './screeningTimeReducer'
import reservationProcessReducer from './reservationProcessReducer';

const combinedReducer = combineReducers({
  authenticationState: authReducer,
  cinemaState: cinemaReducer,
  movieState: movieReducer,
  usersState: userReducer,
  screeningTimeState: screeningTimeReducer,
  reservationProcessState: reservationProcessReducer
});

export default combinedReducer
