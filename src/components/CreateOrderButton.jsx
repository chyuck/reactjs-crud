import React, { useState } from "react";
import "./CreateOrderButton.css";
import { Button, Modal, Form } from "react-bootstrap";
import * as validator from "../helpers/validator";
import { connect } from "react-redux";
import { createOrder } from "../redux/actions";
import PropTypes from "prop-types";

export function CreateOrderButton(props) {
    
    const [showModal, setShowModal] = useState(false);

    const [product, updateProduct] = useState("");
    const [quantity, updateQuantity] = useState("");
    const [active, updateActive] = useState(validator.activeValues.yes);

    const productValid = validator.validateProduct(product);
    const quantityValid = validator.validateQuantity(quantity);
    const activeValid = validator.validateActive(active);
    const buttonEnabled = productValid && quantityValid && activeValid;

    const handleCreate = () => {
        props.createOrder({
            product: product,
            quantity: parseInt(quantity),
            active: active === validator.activeValues.yes
        });
        
        handleClose();
    }

    const handleClose = () => {
        setShowModal(false);

        updateProduct("");
        updateQuantity("");
        updateActive(validator.activeValues.yes);
    }

    return (
        <div>
            <Button variant="success" className="create-button" onClick={() => setShowModal(true)}>Create</Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleCreate} disabled={!buttonEnabled}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

CreateOrderButton.propTypes = {
    createOrder: PropTypes.func.isRequired
}

export default connect(
    null,
    { createOrder }
)(CreateOrderButton);