"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cart from './Cart';
import { connect } from "react-redux";
import {deleteCartOnServer, createOrderOnServer} from "../store";
import StripeCheckout from 'react-stripe-checkout';

class CartCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', address: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({[key]: val});
  }

  render() {

    let orderInfoObj = {orderAddress: this.state.address, orderEmail: this.state.email, orderProds: this.props.cartProds, orderTotal: this.props.cartTotal};

    let checkoutDisabled = "true";
    if (this.state.email.length && this.state.address.length) checkoutDisabled = false;

    return (
      <div className="container">
        <Cart isInCheckout='true'/>
        <div className="form order-form cart-container">
          <div className="form-group">
            <label htmlFor="address">SHIPPING ADDRESS</label>
            <input className="form-control" name="address" id="addressI" onChange={this.handleChange} value={this.state.address} placeholder="Your address"></input>
            <label htmlFor="address" className="email-input">EMAIL</label>
            <input className="form-control" name="email" id="emailI" onChange={this.handleChange} value={this.state.email} placeholder="Your email"></input>
           </div>
            <button type="submit" disabled={checkoutDisabled}className="btn btn-primary" onClick={(evt) => this.props.handleOrderSubmit(evt, orderInfoObj)}>PLACE MY ORDER</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartProds: state.cart.cartProds,
    cartTotal: state.cart.cartTotal
  };
};


const mapDispatch = (dispatch, ownProps) => {
  return {
    handleOrderSubmit(e, orderInfo) {
      e.preventDefault();
      dispatch(createOrderOnServer(orderInfo, ownProps.history));
      dispatch(deleteCartOnServer());
    }

  };
};

const CheckoutContainer = connect(mapState, mapDispatch)(CartCheckout);

export default CheckoutContainer;
