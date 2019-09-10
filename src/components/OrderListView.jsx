import React from "react";
import { Button } from "react-bootstrap";
import "./OrderListView.css";
import DataService from "../services/DataService";
import OrderListTable from "./OrderListTable";
import CreateOrderModal from "./CreateOrderModal";

export default class OrderListView extends React.Component {
    constructor(props) {
        super(props);

        this.dataService = new DataService();

        this.state = { 
            orders: [],
            showCreateOrderModal: false
        };
    }
    
    async componentDidMount() {
        await this.refreshOrders();
    }

    refreshOrders = async () => {
        const orders = await this.dataService.getOrders();

        this.setState({ orders });
    }

    handleCreateOrderButtonClick = () => {
        this.setState({ showCreateOrderModal: true });
    }

    handleCreateOrderModalClose = () => {
        this.setState({ showCreateOrderModal: false });
    }

    handleCreateOrderModalSubmit = async (newOrder) => {
        await this.dataService.createOrder(newOrder);
        const orders = await this.dataService.getOrders();

        this.setState({ showCreateOrderModal: false, orders });
    }

    handleOrderUpdate = async (order) => {
        await this.dataService.updateOrder(order);
        
        await this.refreshOrders();
    }

    handleOrderDelete = async (order) => {
        await this.dataService.deleteOrder(order);
        
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