const initState = {
    consignors: []
};

const consignorReducer = (state = initState, action) => {
    if (action.type === "CONSIGNOR_DATA") {
        return {
            ...state,
            consignors: action.consignors
        }
    } else {
        return state
    };
};

export default consignorReducer;
