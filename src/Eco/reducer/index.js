import {combineReducers} from 'redux';
import cashflowReducer from './cashflow';
import terminalReducer from './terminal'
import vendorReducer from './vendor'
export default combineReducers({
    terminal: terminalReducer,
    cashflow: cashflowReducer,
    vendor: vendorReducer
});