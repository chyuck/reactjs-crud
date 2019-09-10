import dataService from "../services/DataService";
import * as actionTypes from "./actionTypes";

export async function refreshOrdersCompleted(orders) {
    return {
        type: actionTypes.REFRESH_ORDERS_COMPLETED,
        payload: orders
    }
}

export function refreshOrders() {
    return async function(dispatch) {
        const orders = await dataService.getOrders();

        const action = await refreshOrdersCompleted(orders);

        dispatch(action);
    }
}

export function createOrder(order) {
    return async function(dispatch) {
        await dataService.createOrder(order);
        
        await refreshOrders()(dispatch);
    }
}

export function updateOrder(order) {
    return async function(dispatch) {
        await dataService.updateOrder(order);
        
        await refreshOrders()(dispatch);
    }
}

export function deleteOrder(order) {
    return async function(dispatch) {
        await dataService.deleteOrder(order);
        
        await refreshOrders()(dispatch);
    }
}