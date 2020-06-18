import {combineReducers} from 'redux';
import timeReducer from './timeReducer'
import laneReducer from "./laneReducer";

const rootReducer = combineReducers({
    time : timeReducer,
    lane: laneReducer
});

export default rootReducer;