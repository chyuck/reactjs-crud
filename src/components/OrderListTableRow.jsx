import React from "react";
import { Button } from "react-bootstrap";
import * as formatter from "../helpers/formatter";
import DeleteOrderModal from "./DeleteOrderModal";
import UpdateOrderModal from "./UpdateOrderModal";
import PropTypes from "prop-types";

export default class OrderListTableRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUpdateOrderModal: false,
            showDeleteOrderModal: false
        };
    }

    handleUpdateButtonClick = () => {
        this.setState({ showUpdateOrderModal: true });
    }

    handleUpdateOrderModalClose = () => {
        this.setState({ showUpdateOrderModal: false });
    }

    handleUpdateOrderModalSubmit = async (updatedOrder) => { 
        this.setState({ showUpdateOrderModal: false });

        await this.props.onUpdate(updatedOrder);
    }

    handleDeleteButtonClick = () => {
        this.setState({ showDeleteOrderModal: true });
    }

    handleDeleteOrderModalClose = () => {
        this.setState({ showDeleteOrderModal: false });
    }

    handleDeleteOrderModalSubmit = async () => {
        this.setState({ showDeleteOrderModal: false });

        await this.props.onDelete(this.props.order);
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

OrderListTableRow.propTypes = {
    order: PropTypes.exact({
        id: PropTypes.string.isRequired,
        product: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired,
        created: PropTypes.string.isRequired,
        updated: PropTypes.string.isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}