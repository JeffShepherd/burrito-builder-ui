import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      message: ''
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if(this.state.name && this.state.ingredients.length) {
      this.props.submitNewOrder({name: this.state.name, ingredients: this.state.ingredients})
      this.clearInputs();
    } else {
      this.setState({message: 'Please enter a name and choose an ingredient before submitting'})
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [], message: ''});
  }

  handleIngredientChange = (e) => {
    e.preventDefault(e);
    this.setState({ingredients: [e.target.name, ...this.state.ingredients]})
  }

  handleNameChange = (e) => {
    e.preventDefault(e);
    this.setState({name: e.target.value})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button id={ingredient} key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <>
        <form>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={this.state.name}
            onChange={e => this.handleNameChange(e)}
          />

          { ingredientButtons }

          <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

          <button className="submit-order-button" onClick={e => this.handleSubmit(e)}>
            Submit Order
          </button>
        </form>

        {this.state.message && <p className="warning-message">{this.state.message}</p>}

      </>
    )
  }
}

export default OrderForm;
