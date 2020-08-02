import authReducer from './authReducer'
import cinemaReducer from './cinemaReducer'
import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import screeningTimeReducer from './screeningTimeReducer'
import reservationProcessReducer from './reservationProcessReducer';
import reservationReducer from './reservationReducer';
import chatReducer from './chatReducer'

const combinedReducer = combineReducers({
  authenticationState: authReducer,
  cinemaState: cinemaReducer,
  movieState: movieReducer,
  screeningTimeState: screeningTimeReducer,
  reservationProcessState: reservationProcessReducer,
  reservationsState: reservationReducer,
  chatState: chatReducer
});

export default combinedReducer
