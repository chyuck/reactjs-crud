import React from "react";
import { Table } from "react-bootstrap";
import OrderListTableRow from "./OrderListTableRow";
import PropTypes from "prop-types";

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
                        <OrderListTableRow 
                            key={order.id} 
                            order={order}
                            onUpdate={this.props.onUpdate}
                            onDelete={this.props.onDelete} />
                    ))}
                </tbody>
            </Table>
        )
    }
}

OrderListTable.propTypes = {
    orders: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            product: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            active: PropTypes.bool.isRequired,
            created: PropTypes.string.isRequired,
            updated: PropTypes.string.isRequired
        })).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}