import React from "react";
import { Table } from "react-bootstrap";
import OrderListTableRow from "./OrderListTableRow";

export default class OrderListTable extends React.Component {
    render() {
        return (
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
                    { this.props.orders.map(order => (
                        <OrderListTableRow key={order.id} order={order} />
                    ))}
                </tbody>
            </Table>
        )
    }
}