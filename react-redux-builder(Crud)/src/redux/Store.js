import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import { productReducer } from './ProductReducer';
import { userReducer } from './UserReducer';

const rootReducer = combineReducers({
  products: productReducer,
  users: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;