import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import OrderListTableRow from "./OrderListTableRow";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { refreshOrders } from "../redux/actions";

export function OrderListTable({ orders, refreshOrders }) {

    useEffect(() => {refreshOrders()}, [refreshOrders]);

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
                { orders.map(order => (
                    <OrderListTableRow key={order.id} order={order} />
                ))}
            </tbody>
        </Table>
    );
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
    refreshOrders: PropTypes.func.isRequired
}

export default connect(
    (state, _) => { return { orders: state.orders}; },
    { refreshOrders }
)(OrderListTable);