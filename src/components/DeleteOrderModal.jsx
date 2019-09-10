import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

export default class DeleteOrderModal extends React.Component {
    handleSubmit = async () => {
        await this.props.onSubmit(this.props.order);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to delete the order?</p>
                    <p><b>Product:</b> {this.props.order.product}</p>
                    <p><b>Quantity:</b> {this.props.order.quantity}</p>
                    <p><b>Active:</b> {this.props.order.active ? "Yes" : "No"}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
                    <Button variant="danger" onClick={this.handleSubmit}>Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

DeleteOrderModal.propTypes = {
    order: PropTypes.shape({
        product: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired
    }).isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}