import React from "react";
import { Button } from "react-bootstrap";
import "./OrderListView.css";
import OrderListTable from "./OrderListTable";
import CreateOrderModal from "./CreateOrderModal";
import { connect } from "react-redux";
import { refreshOrders, createOrder, updateOrder, deleteOrder } from "../redux/actions";

export class OrderListView extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            showCreateOrderModal: false
        };
    }
    
    componentDidMount() {
        this.props.refreshOrders();
    }

    handleCreateOrderButtonClick = () => {
        this.setState({ showCreateOrderModal: true });
    }

    handleCreateOrderModalClose = () => {
        this.setState({ showCreateOrderModal: false });
    }

    handleCreateOrderModalSubmit = async (newOrder) => {
        this.props.createOrder(newOrder);

        this.setState({ showCreateOrderModal: false });
    }

    handleOrderUpdate = (order) => {
        this.props.updateOrder(order);
    }

    handleOrderDelete = (order) => {
        this.props.deleteOrder(order);
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
                    orders={this.props.orders} 
                    onUpdate={this.handleOrderUpdate} 
                    onDelete={this.handleOrderDelete}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        orders: state.orders 
    };
}

export default connect(
    mapStateToProps,
    {refreshOrders, createOrder, updateOrder, deleteOrder}
)(OrderListView);