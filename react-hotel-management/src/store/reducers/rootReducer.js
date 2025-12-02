import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import reservationReducer from './reservationReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  rooms: roomReducer,
  reservations: reservationReducer,
  auth: authReducer,
});

export default rootReducer;
