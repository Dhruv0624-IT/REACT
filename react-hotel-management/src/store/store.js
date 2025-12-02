import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import roomReducer from './reducers/roomReducer';
import reservationReducer from './reducers/reservationReducer';
import authReducer from './reducers/authReducer'; 

const rootReducer = combineReducers({
  rooms: roomReducer,
  reservations: reservationReducer,
  auth: authReducer, 
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;