import React, { Component } from "react";

class EditOrders extends Component {
    render() {
        return (
            <div>
                <h1>Edit Order # {this.props.match.params.id}</h1>
            </div>
        );
    }
};

export default EditOrders;