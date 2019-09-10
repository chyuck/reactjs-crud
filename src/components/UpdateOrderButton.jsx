import React, { useState } from "react";
import "./UpdateOrderButton.css";
import { Button, Modal, Form } from "react-bootstrap";
import * as formatter from "../helpers/formatter";
import * as validator from "../helpers/validator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateOrder } from "../redux/actions";

export function UpdateOrderButton({ order, updateOrder }) {
    
    const [showModal, setShowModal] = useState(false);

    const [product, updateProduct] = useState("");
    const [quantity, updateQuantity] = useState("");
    const [active, updateActive] = useState(validator.activeValues.yes);

    const productValid = validator.validateProduct(product);
    const quantityValid = validator.validateQuantity(quantity);
    const activeValid = validator.validateActive(active);
    const buttonEnabled = productValid && quantityValid && activeValid;
        
    const handleUpdate = () => {
        updateOrder({
            id: order.id,
            product: product,
            quantity: parseInt(quantity),
            active: active === validator.activeValues.yes,
            created: order.created,
            updated: order.updated
        });
        
        handleClose();
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleModalShow = () => {
        updateProduct(order.product);
        updateQuantity(order.quantity.toString());
        updateActive(formatter.formatActive(order.active));
    }

    return (
        <span>
            <Button variant="primary" size="sm" className="update-button" onClick={() => setShowModal(true)}>Update</Button>

            <Modal show={showModal} onHide={handleClose} onShow={handleModalShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="sm" 
                            readOnly 
                            defaultValue={order.id}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Product</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="sm"
                            value={product} 
                            onChange={(event) => updateProduct(event.target.value)}
                            isValid={productValid}
                            isInvalid={!productValid}/>
                        <Form.Control.Feedback type="valid">{validator.validMessage}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{validator.errorMessages.product}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control 
                            type="number" 
                            size="sm"
                            value={quantity} 
                            onChange={(event) => updateQuantity(event.target.value)}
                            isValid={quantityValid}
                            isInvalid={!quantityValid}/>
                        <Form.Control.Feedback type="valid">{validator.validMessage}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{validator.errorMessages.quantity}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Active</Form.Label>
                        <Form.Control 
                            as="select" 
                            size="sm"
                            value={active} 
                            onChange={(event) => updateActive(event.target.value)}
                            isValid={activeValid}
                            isInvalid={!activeValid}>
                            <option>{validator.activeValues.yes}</option>
                            <option>{validator.activeValues.no}</option>
                        </Form.Control>
                        <Form.Control.Feedback type="valid">{validator.validMessage}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{validator.errorMessages.active}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Create Time</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="sm"
                            readOnly 
                            defaultValue={formatter.formatDateString(order.created)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Update Time</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="sm"
                            readOnly 
                            defaultValue={formatter.formatDateString(order.updated)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleUpdate} disabled={!buttonEnabled}>Update</Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
}

UpdateOrderButton.propTypes = {
    order: PropTypes.exact({
        id: PropTypes.string.isRequired,
        product: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired,
        created: PropTypes.string.isRequired,
        updated: PropTypes.string.isRequired
    }).isRequired,
    updateOrder: PropTypes.func.isRequired
}

export default connect(
    (_, ownProps) => ownProps,
    { updateOrder }
)(UpdateOrderButton);