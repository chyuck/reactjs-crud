import * as actionTypes from "./actionTypes";

const initialState = {
    orders: []
};

export default function orderReducer(state = initialState, action) {
    if (action.type === actionTypes.REFRESH_ORDERS_COMPLETED) {
        return {
            orders: action.payload.map(order => Object.assign({}, order))
        };
    }

    return state;
}