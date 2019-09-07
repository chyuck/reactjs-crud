import React from "react";
import { Button } from "react-bootstrap";
import * as formatter from "../helpers/formatter";
import DeleteOrderModal from "./DeleteOrderModal";
import UpdateOrderModal from "./UpdateOrderModal";
import * as dataService from "../services/dataService";

export default class OrderListTableRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUpdateOrderModal: false,
            showDeleteOrderModal: false
        };

        this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
        this.handleUpdateOrderModalClose = this.handleUpdateOrderModalClose.bind(this);
        this.handleUpdateOrderModalSubmit = this.handleUpdateOrderModalSubmit.bind(this);

        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
        this.handleDeleteOrderModalClose = this.handleDeleteOrderModalClose.bind(this);
        this.handleDeleteOrderModalSubmit = this.handleDeleteOrderModalSubmit.bind(this);
    }

    handleUpdateButtonClick() {
        this.setState({ showUpdateOrderModal: true });
    }

    handleUpdateOrderModalClose() {
        this.setState({ showUpdateOrderModal: false });
    }

    async handleUpdateOrderModalSubmit(updatedOrder) {
        await dataService.updateOrder(updatedOrder);
        
        this.setState({ showUpdateOrderModal: false });
    }

    handleDeleteButtonClick() {
        this.setState({ showDeleteOrderModal: true });
    }

    handleDeleteOrderModalClose() {
        this.setState({ showDeleteOrderModal: false });
    }

    async handleDeleteOrderModalSubmit() {
        await dataService.deleteOrder(this.props.order.id);
        
        this.setState({ showDeleteOrderModal: false });
    }

    render() {
        return (
            <tr>
                <td>{this.props.order.product}</td>
                <td>{this.props.order.quantity}</td>
                <td>{this.props.order.active ? "Yes" : "No"}</td>
                <td>{formatter.formatDateString(this.props.order.created)}</td>
                <td>{formatter.formatDateString(this.props.order.updated)}</td>
                <td>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        className="button" 
                        onClick={this.handleUpdateButtonClick}>
                        Update
                    </Button>
                    <UpdateOrderModal 
                        show={this.state.showUpdateOrderModal} 
                        order={this.props.order} 
                        onClose={this.handleUpdateOrderModalClose} 
                        onSubmit={this.handleUpdateOrderModalSubmit} />

                    <Button 
                        variant="danger" 
                        size="sm" 
                        className="button" 
                        onClick={this.handleDeleteButtonClick}>
                        Delete
                    </Button>
                    <DeleteOrderModal 
                        show={this.state.showDeleteOrderModal} 
                        order={this.props.order} 
                        onClose={this.handleDeleteOrderModalClose} 
                        onSubmit={this.handleDeleteOrderModalSubmit} />
                </td>
            </tr> 
        )
    }
}