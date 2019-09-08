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
        return Promise.resolve(this.orders);
    }
    
    async getOrder(id) {
        return Promise.resolve(this.orders.find(order => order.id === id));
    }
    
    async createOrder(order) {
        order.id = uuid();
        
        const timestamp = new Date().toISOString();
        order.created = timestamp;
        order.updated = timestamp;
    
        this.orders.push(order);
    
        return Promise.resolve(order);
    }
    
    async updateOrder(order) {
        const existingOrder = await this.getOrder(order.id);
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
    
    async deleteOrder(order) {
        this.orders = this.orders.filter(o => o.id !== order.id);
    
        return Promise.resolve(order);
    }
}