import moment from "moment";

let times = moment.utc(new Date()).local().format()
const initState = {
    indentTime : times,
    closingTime: times,
    loadingTime: times
};

const timeReducer = (state = initState,action) => {
    if (action.type === "INDENT_TIME") {
        return {
            ...state,
            indentTime: action.indentTime,
        }
    }
    else if(action.type === "CLOSING_TIME"){
        return {
            ...state,
            closingTime: action.closingTime,
        }
    }
    else if(action.type === "LOADING_TIME"){
        return {
            ...state,
            loadingTime: action.loadingTime,
        }
    }
    else {
        return state
    }
};

export default timeReducer;
