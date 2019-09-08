

export default class ApiDataService {
    constructor(url) {
        this.ordersUrl = `${url}/orders/`;
    }

    async makeSureResponseIs200(response) {        
        if (response.ok) {
            return;
        }

        const status = response.status;
        const body = await response.text();

        throw new Error(`Server returned '${status}' status and the following body: ${body}.`);
    }

    async getOrders() {
        const response = await fetch(this.ordersUrl);
        await this.makeSureResponseIs200(response);

        return await response.json();
    }
    
    async getOrder(id) {
        const response = await fetch(`${this.ordersUrl}${id}`);
        await this.makeSureResponseIs200(response);

        return await response.json();
    }
    
    async createOrder(order) {
        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(this.ordersUrl, options);
        await this.makeSureResponseIs200(response);

        return await response.json();
    }
    
    async updateOrder(order) {
        const options = {
            method: "PUT",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(`${this.ordersUrl}${order.id}`, options);
        await this.makeSureResponseIs200(response);

        return await response.json();
    }
    
    async deleteOrder(order) {
        const options = {
            method: "DELETE"
        };

        const response = await fetch(`${this.ordersUrl}${order.id}`, options);
        await this.makeSureResponseIs200(response);

        return await response.json();
    }
}