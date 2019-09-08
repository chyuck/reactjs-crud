import config from "../helpers/config";
import LocalDataService from "./LocalDataService";
import ApiDataService from "./ApiDataService";

export default class DataService {
    constructor() {
        this.dataService = config.api.use ? new ApiDataService(config.api.url) : new LocalDataService();
    }

    async getOrders() {
        return await this.dataService.getOrders();
    }
    
    async getOrder(id) {
        return await this.dataService.getOrder(id);
    }
    
    async createOrder(order) {
        return await this.dataService.createOrder(order);
    }
    
    async updateOrder(order) {
        return await this.dataService.updateOrder(order);
    }
    
    async deleteOrder(order) {
        return await this.dataService.deleteOrder(order);
    }
}