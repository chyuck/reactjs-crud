import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderListView from "./components/OrderListView";
import { Provider } from "react-redux";
import store from "./redux/store";
 
ReactDOM.render(
    <Provider store={store}>
        <OrderListView />
    </Provider>, 
    document.getElementById('root'));