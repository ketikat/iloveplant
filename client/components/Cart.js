"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchCartFromServer,
  removeItemFromCart,
  updateCartQuantitiesOnServer
} from "../store";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentDidMount() {
    this.props.loadCartData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cartProds.length) {
      let test = nextProps.cartProds.reduce((prev, curr) => {
        prev[curr.id] = curr.cartQuantity;
        return prev;
      }, {});
      this.setState(test);
    }
  }

  handleChange(e) {
    let key = e.target.name;
    let val = e.target.value;
    this.props.updateCartQuant({ changes: { [key]: val } });
  }

  render() {
    let isInCheckout = this.props.isInCheckout;
    let cart = this.props.cartProds;
    let cartTotal = this.props.cartTotal;

    const createInvDD = product => {
      let inventoryArr = [];
      for (let i = 1; i <= product.inventory; i++) {
        inventoryArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      return (
        <select
          id="quantity-select"
          className="form-control"
          name={product.id}
          value={this.state[product.id]}
          onChange={this.handleChange}
        >
          {inventoryArr}
        </select>
      );
    };

    if (!cart.length) {
      return (
        <div className="main-cart-container">
          <div className="back-link">
            <Link to="/">{"<< Keep Shopping"}</Link>
          </div>
          <div className="cart-container">
            <h2>MY CART</h2>
            <h5>Your cart is empty :(</h5>
            <Link className="product-link" to="/products">
              <p>Go add some stuff!</p>
            </Link>
          </div>
        </div>
      );
    }

    let pageTitle;
    if (!isInCheckout) pageTitle = "MY CART";
    else pageTitle = "CHECKOUT";

    return (
      <div className="main-cart-container">
        <div className="back-link">
          <Link to="/">{"<< Keep Shopping"}</Link>
        </div>
        <div className="cart-container">
          <h2>{pageTitle}</h2>
          {cart.map(product => {
            return (
              <div key={product.id} className="cart-grid">
                <hr />
                <div className="cart-product-outer-box">
                  <div className="product-image-cart-wrapper">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image} className="product-image-cart" />
                    </Link>
                  </div>
                  <div className="cart-product-inner-box">
                    <div className="cart-pricing-wrapper">
                      <Link
                        className="product-link"
                        to={`/products/${product.id}`}
                      >
                        {product.name}
                      </Link>
                      <span>
                        <button
                          id="remove-btn"
                          className="btn remove-btn"
                          onClick={() => this.props.removeFromCart({ product })}
                        >
                         X
                        </button>
                      </span>
                    </div>
                    <div className="cart-pricing-wrapper">
                      <span>${product.price * product.cartQuantity}</span>
                      <span>{createInvDD(product)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="cart-pricing-wrapper">
            <div id="cart-total">TOTAL: ${cartTotal}</div>
            {!isInCheckout && (
              <Link to="/checkout">
                <button className="btn btn-primary">CHECKOUT</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
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
    loadCartData() {
      dispatch(fetchCartFromServer());
    },
    removeFromCart(product) {
      dispatch(removeItemFromCart(product));
    },
    updateCartQuant(changes) {
      dispatch(updateCartQuantitiesOnServer(changes));
    }
  };
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
