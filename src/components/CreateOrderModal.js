import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import * as validator from "../helpers/validator";

export default class CreateOrderModal extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            product: "",
            quantity: "",
            active: validator.activeValues.yes
        };

        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleActiveChange = this.handleActiveChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleProductChange(event) {
        this.setState({ product: event.target.value });
    }

    handleQuantityChange(event) {
        this.setState({ quantity: event.target.value });
    }

    handleActiveChange(event) {
        this.setState({ active: event.target.value });
    }

    async handleSubmit() {
        await this.props.onSubmit({
            product: this.state.product,
            quantity: parseInt(this.state.quantity),
            active: this.state.active === validator.activeValues.yes
        });
    }

    handleOpen() {
        this.setState({
            product: "",
            quantity: "",
            active: validator.activeValues.yes
        });
    }

    render() {
        const productValid = validator.validateProduct(this.state.product);
        const quantityValid = validator.validateQuantity(this.state.quantity);
        const activeValid = validator.validateActive(this.state.active);
        const buttonEnabled = productValid && quantityValid && activeValid;

        return (
            <Modal show={this.props.show} onHide={this.props.onClose} onShow={this.handleOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Product</Form.Label>
                        <Form.Control
                            type="text" 
                            size="sm"
                            value={this.state.product} 
                            onChange={this.handleProductChange}
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
                            value={this.state.quantity} 
                            onChange={this.handleQuantityChange}
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
                            value={this.state.active} 
                            onChange={this.handleActiveChange}
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
                    <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
                    <Button variant="success" onClick={this.handleSubmit} disabled={!buttonEnabled}>Create</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}