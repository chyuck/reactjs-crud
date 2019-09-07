import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import * as formatter from "../helpers/formatter";

export default class UpdateOrderModal extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            product: props.order.product,
            quantity: props.order.quantity,
            active: props.order.active
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
        await this.props.onSubmit({
            id: this.props.order.id,
            product: this.state.product,
            quantity: this.state.quantity,
            active: this.state.active,
            created: this.props.order.created,
            updated: this.props.order.updated,
        });
    }

    handleOpen() {
        this.setState({
            product: this.props.order.product,
            quantity: this.props.order.quantity,
            active: this.props.order.active
        });
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose} onShow={this.handleOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" readOnly defaultValue={this.props.order.id}/>
                    </Form.Group>
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
                    <Form.Group>
                        <Form.Label>Create Time</Form.Label>
                        <Form.Control type="text" readOnly defaultValue={formatter.formatDateString(this.props.order.created)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Update Time</Form.Label>
                        <Form.Control type="text" readOnly defaultValue={formatter.formatDateString(this.props.order.updated)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
                    <Button variant="success" onClick={this.handleSubmit}>Update</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}