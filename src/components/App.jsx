import React from "react";
import "./App.css";
import OrderListTable from "./OrderListTable";
import CreateOrderButton from "./CreateOrderButton";

export default function App() {
    return (
        <div className="center">
            <h1>Orders</h1>    
            <CreateOrderButton />
            <OrderListTable/>
        </div>
    );
}