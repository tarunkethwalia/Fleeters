import {combineReducers} from 'redux';
import timeReducer from './timeReducer'
import laneReducer from "./laneReducer";
import consignorReducer from "./consignorReducer";

const rootReducer = combineReducers({
    time : timeReducer,
    lane: laneReducer,
    consignor: consignorReducer
});

export default rootReducer;