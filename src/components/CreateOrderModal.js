import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default class CreateOrderModal extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            product: "",
            quantity: 1,
            active: true
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
        this.setState({ active: event.target.checked });
    }

    async handleSubmit() {
        await this.props.onSubmit(this.state);
    }

    handleOpen() {
        this.setState({
            product: "",
            quantity: 1,
            active: true
        });
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose} onShow={this.handleOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Product</Form.Label>
                        <Form.Control type="text" value={this.state.product} onChange={this.handleProductChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" value={this.state.quantity} onChange={this.handleQuantityChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Active</Form.Label>
                        <Form.Control as="select" value={this.state.active ? "Yes" : "No"} onChange={this.handleActiveChange}>
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
                    <Button variant="success" onClick={this.handleSubmit}>Create</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}