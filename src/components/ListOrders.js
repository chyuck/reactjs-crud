import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { getOrders } from "../services/data";
import { Link } from "react-router-dom";
import "./ListOrders.css";
import { formatDateString } from "../helpers/formatter";

class ListOrders extends Component {
    constructor() {
        super();
        this.state = { orders: [] };
    }
    
    async componentDidMount() {
        const orders = await getOrders();
        console.log(orders);
        this.setState({ orders });
    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                
                <Link to="/create"><Button variant="success" className="create-button">Create</Button></Link>
                
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Active</th>
                            <th>Create Time</th>
                            <th>Update Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td>{order.active ? "Yes" : "No"}</td>
                                <td>{formatDateString(order.created)}</td>
                                <td>{formatDateString(order.updated)}</td>
                                <td>
                                    <Link to={`/edit/${order.id}`}>
                                        <Button variant="primary" size="sm" className="button">Update</Button>
                                    </Link>
                                    <Button variant="danger" size="sm" className="button">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
};

export default ListOrders;