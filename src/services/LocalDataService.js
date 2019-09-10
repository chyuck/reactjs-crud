import uuid from "uuid/v1";

export default class LocalDataService {
    constructor() {
        this.orders = this.createInitialOrders();
    }

    createInitialOrders() {
        return [
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
    }

    async getOrders() {
        const orders = this.orders.map(order => Object.assign({}, order));

        return await Promise.resolve(orders);
    }
    
    async getOrder(id) {
        const order = await Promise.resolve(this.orders.find(order => order.id === id));

        return Object.assign({}, order);
    }
    
    async createOrder(order) {
        const newOrder = Object.assign({}, order);

        newOrder.id = uuid();
        
        const timestamp = new Date().toISOString();
        newOrder.created = timestamp;
        newOrder.updated = timestamp;
    
        this.orders.push(newOrder);
    
        return await Promise.resolve(newOrder);
    }
    
    async updateOrder(order) {
        const existingOrder = this.orders.find(o => o.id === order.id);
        if (!existingOrder) {
            throw new Error(`Order with ID=${order.id} is not found.`);
        }
    
        const timestamp = new Date().toISOString();
        existingOrder.update = timestamp;
    
        existingOrder.product = order.product;
        existingOrder.quantity = order.quantity;
        existingOrder.active = order.active;

        return await Promise.resolve(Object.assign({}, existingOrder));
    }
    
    async deleteOrder(order) {
        this.orders = this.orders.filter(o => o.id !== order.id);
    
        return await Promise.resolve(Object.assign({}, order));
    }
}