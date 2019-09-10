import React from "react";
import { Button } from "react-bootstrap";
import * as formatter from "../helpers/formatter";
import DeleteOrderButton from "./DeleteOrderButton";
import UpdateOrderModal from "./UpdateOrderModal";
import PropTypes from "prop-types";

export default class OrderListTableRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUpdateOrderModal: false
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

                    <DeleteOrderButton order={this.props.order} />
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