import React from "react";
import { Button } from "react-bootstrap";
import "./OrderListView.css";
import * as dataService from "../services/dataService";
import OrderListTable from "./OrderListTable";
import CreateOrderModal from "./CreateOrderModal";

export default class OrderListView extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            orders: [],
            showCreateOrderModal: false
        };

        this.handleCreateOrderButtonClick = this.handleCreateOrderButtonClick.bind(this);
        this.handleCreateOrderModalClose = this.handleCreateOrderModalClose.bind(this);
        this.handleCreateOrderModalSubmit = this.handleCreateOrderModalSubmit.bind(this);

        this.handleOrderUpdate = this.handleOrderUpdate.bind(this);
        this.handleOrderDelete = this.handleOrderDelete.bind(this);
    }
    
    async componentDidMount() {
        await this.refreshOrders();
    }

    async refreshOrders() {
        const orders = await dataService.getOrders();

        this.setState({ orders });
    }

    handleCreateOrderButtonClick() {
        this.setState({ showCreateOrderModal: true });
    }

    handleCreateOrderModalClose() {
        this.setState({ showCreateOrderModal: false });
    }

    async handleCreateOrderModalSubmit(newOrder) {
        await dataService.createOrder(newOrder);
        const orders = await dataService.getOrders();

        this.setState({ showCreateOrderModal: false, orders });
    }

    async handleOrderUpdate(order) {
        await dataService.updateOrder(order);
        
        await this.refreshOrders();
    }

    async handleOrderDelete(order) {
        await dataService.deleteOrder(order);
        
        this.refreshOrders();
    }

    render() {
        return (
            <div className="center">
                <h1>Orders</h1>
                
                <Button variant="success" className="create-button" 
                    onClick={this.handleCreateOrderButtonClick}>
                    Create
                </Button>
                <CreateOrderModal 
                    show={this.state.showCreateOrderModal} 
                    onClose={this.handleCreateOrderModalClose} 
                    onSubmit={this.handleCreateOrderModalSubmit} 
                />

                <OrderListTable 
                    orders={this.state.orders} 
                    onUpdate={this.handleOrderUpdate} 
                    onDelete={this.handleOrderDelete}/>
            </div>
        );
    }
};