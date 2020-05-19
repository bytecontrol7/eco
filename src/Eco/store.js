import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer'
import thunk from 'redux-thunk';
const middleware = [thunk];
const initialState = [];
const store = createStore(rootReducer,initialState, applyMiddleware(...middleware));

export default store