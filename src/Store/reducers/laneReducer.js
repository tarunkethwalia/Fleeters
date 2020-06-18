const initState = {
    lanes: []
};

const laneReducer = (state = initState, action) => {
    if (action.type === "LANE_DATA") {
        return {
            ...state,
            lanes: action.lanes
        }
    } else {
        return state
    };
};

export default laneReducer;
