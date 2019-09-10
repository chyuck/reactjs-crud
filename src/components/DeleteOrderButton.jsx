import React, { useState } from "react";
import "./DeleteOrderButton.css";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteOrder } from "../redux/actions";
import * as formatter from "../helpers/formatter";

export function DeleteOrderButton({ order, deleteOrder }) {

    const [showModal, setShowModal] = useState(false);
    
    const handleDelete = () => {
        deleteOrder(order);

        handleClose();
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <span>
            <Button variant="danger" size="sm" className="delete-button" onClick={() => setShowModal(true)}>Delete</Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to delete the order?</p>
                    <p><b>Product:</b> {order.product}</p>
                    <p><b>Quantity:</b> {order.quantity}</p>
                    <p><b>Active:</b> {formatter.formatActive(order.active)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </span>  
    );
}

DeleteOrderButton.propTypes = {
    order: PropTypes.shape({
        product: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired
    }).isRequired,
    deleteOrder: PropTypes.func.isRequired
}

export default connect(
    (_, ownProps) => ownProps,
    { deleteOrder }
)(DeleteOrderButton);