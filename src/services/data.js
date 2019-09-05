import { uuid } from "uuid/v1";

var orders = [
    {  
        id: "a5b97d20-aa3b-11e9-8f1e-ffa5d9f32bc9",
        product: "Apple",
        quantity: 3,
        active: true,
        created: "2019-07-19T15:41:17.169Z",
        updated: "2019-07-19T15:41:17.169Z"
     },
     {  
        id: "12745fae-0859-483b-ae7a-f3970f9d8bfd",
        product: "Orange",
        quantity: 2,
        active: true,
        created: "2019-07-19T15:42:18.160Z",
        updated: "2019-07-19T15:42:55.189Z"
     }
];

export async function getOrders() {
    return Promise.resolve(orders);
}

export async function getOrder(id) {
    return Promise.resolve(orders.find(order => order.id === id));
}

export async function create(order) {
    order.id = uuid();
    
    const timestamp = new Date().toISOString();
    order.created = timestamp;
    order.updated = timestamp;

    orders.push(order);

    return Promise.resolve(order);
}

export async function update(order) {
    const existingOrder = getOrder(order.id);
    if (!existingOrder) {
        throw new Error(`Order with ID=${order.id} is not found.`);
    }

    const timestamp = new Date().toISOString();
    existingOrder.update = timestamp;

    existingOrder.product = order.product;
    existingOrder.quantity = order.quantity;
    existingOrder.active = order.active;
    
    return Promise.resolve(existingOrder);
}

export async function deleteOrder(id) {
    const existingOrder = getOrder(id);
    if (!existingOrder) {
        throw new Error(`Order with ID=${id} is not found.`);
    }

    orders = orders.filter(order => order.id !== existingOrder.id);

    return Promise.resolve(existingOrder);
}