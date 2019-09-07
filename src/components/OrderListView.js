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
    }
    
    async componentDidMount() {
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

        this.setState({ showCreateOrderModal: false });
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

                <OrderListTable orders={this.state.orders} />
            </div>
        );
    }
};