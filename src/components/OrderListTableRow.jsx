import React from "react";
import * as formatter from "../helpers/formatter";
import DeleteOrderButton from "./DeleteOrderButton";
import UpdateOrderButton from "./UpdateOrderButton";
import PropTypes from "prop-types";

export default function OrderListTableRow({ order }) {
    return (
        <tr>
            <td>{order.product}</td>
            <td>{order.quantity}</td>
            <td>{formatter.formatActive(order.active)}</td>
            <td>{formatter.formatDateString(order.created)}</td>
            <td>{formatter.formatDateString(order.updated)}</td>
            <td>
                <UpdateOrderButton order={order} />
                <DeleteOrderButton order={order} />
            </td>
        </tr> 
    );
}

OrderListTableRow.propTypes = {
    order: PropTypes.exact({
        id: PropTypes.string.isRequired,
        product: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired,
        created: PropTypes.string.isRequired,
        updated: PropTypes.string.isRequired
    }).isRequired
}