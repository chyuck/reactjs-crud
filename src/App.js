import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ListOrders from "./components/ListOrders";
import CreateOrder from "./components/CreateOrder";
import EditOrder from "./components/EditOrder";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={ListOrders} />
          <Route path="/create" component={CreateOrder} />
          <Route path="/edit/:id" component={EditOrder} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
