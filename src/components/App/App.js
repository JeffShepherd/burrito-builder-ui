import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();

    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount() {
    getOrders()
      .then(allOrders => this.setState({orders: allOrders.orders}))
      .catch(err => this.setState({error: 'An error has occured. Please try again later.'}));
  }

  submitNewOrder = (order) => {
    fetch("http://localhost:3001/api/v1/orders", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(order)
    })
    .then((response) => response.json())
    .then((newOrder) => this.setState({orders: [newOrder, ...this.state.orders]}))
    .catch(err => this.setState({error: 'An error has occured. Please try again later.'}));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <OrderForm submitNewOrder={this.submitNewOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
