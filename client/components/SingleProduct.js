import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  fetchProduct,
  updateCartOnServer,
  removeProduct
} from "../store/index";

/**
 * COMPONENT
 */
class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadProductData();
  }

  handleChange(e) {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({ [key]: val });
  }

  render() {
    const product = this.props.productData;
    const isLoggedIn = this.props.isLoggedIn;
    const isAdmin = this.props.isAdmin;

    //getting inventory array for dropdown menu:
    let inventoryArr = [];
    for (let i = 1; i <= product.inventory; i++) {
      inventoryArr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    let cartProds = this.props.cartProds;
    let isInCart = cartProds.find(item => {
      return item.id === product.id;
    });

    let cartForm;
    if (product.inventory === 0) {
      cartForm = (<div>So sorry, {product.name} is sold out.</div>)
    }
    else if (isInCart) {
      cartForm = (
        <div>
          <p id="testem">Pssst, already in your cart.</p>
          <Link to="/cart">
            {}
            <button type="submit" className="btn btn-primary">
              SEE MY CART
            </button>
          </Link>
        </div>
      );
    } else {
      cartForm = (
        <form id="order-form">
          <div className="form-group">
            <select
              disabled={isInCart}
              className="form-control"
              id="quantityI"
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            >
              {inventoryArr}
            </select>
          </div>
          <Link to="/cart">
            {}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={evt =>
                this.props.handleAddToCart(evt, {
                  productId: product.id,
                  quantity: +this.state.quantity
                })
              }
            >
              ADD TO CART
            </button>
          </Link>
        </form>
      );
    }

    let avgRating = Math.ceil(
      this.props.reviews.reduce((acc, review) => {
        return acc + +review.rating;
      }, 0) / this.props.reviews.length
    );

      let starArr = [];
      for (let i = 0; i < avgRating; i++) {
        starArr.push(
          <img
            key={i}
            className="star-image"
            src="https://i.imgur.com/GE6i7ZM.png"
          />
        );
      }

    let averageRatingEl = starArr.length ? (<div className="product-descriptor" className="star-container">Average User Rating   {starArr} </div>) : undefined

    return (
      <div id="single-product-container">
        <div>
          <div id="back-link" className="back-link"><Link to="/">{"<< back to all plants"}</Link></div>
          <div id="single-product-info">
          <div className="img-wrapper">
              <img src={`/${product.image}`} className="product-image-hero" />
           </div>
            <div >
            <div className="product-descriptor" id="product-name">{product.name}</div>
            <div className="product-descriptor product-species">{product.species}</div>

            <div id="plant-text" className="product-descriptor">{product.description}</div>
            {averageRatingEl}
            <div className="product-price-single" >${product.price}</div>
            {cartForm}
            <hr></hr>
            <div id="reviews-list">
            <div id="review-title">Reviews:</div>

            {this.props.reviews.map(review => {
                 let reviewStars = [];
                  for (let i = 0; i < review.rating; i++) {
                    reviewStars.push(
                      <img
                        key={i}
                        className="star-image-small"
                        src="https://i.imgur.com/GE6i7ZM.png"
                      />
                    );
                  }

              return (
                <li className="review-item" key={review.id}>
                  {review.content}

                  <span className="star-container">{reviewStars}</span>
                </li>
              )

            })}
          </div>
          {isLoggedIn &&
          !isAdmin && ( //and not is admnin
              <button type="button" id="add-review">
                <Link className="product-link" to={`/reviews/new-review/${product.id}`}>
                  Add a Review
                </Link>
              </button>
            )}
            </div>
          </div>

        </div>

        {isAdmin && (
          <div id="product-admin-buttons">
            <button
              onClick={this.props.handleRemove}
              type="button"
              id="delete-product"
            >
              Delete Product
            </button>

            <button type="button" id="edit-product">
              <Link to={`/products/${product.id}/edit`}>Edit Product</Link>
            </button>
          </div>
        )}


      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    productData: state.product.currentProduct,
    cartProds: state.cart.cartProds,
    reviews: state.review.allReviews.filter(review => {
      return review.productId === state.product.currentProduct.id;
    }),
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadProductData() {
      const productThunk = fetchProduct(ownProps.match.params.productId);
      dispatch(productThunk);
    },
    handleAddToCart(evt, prodInfo) {
      dispatch(updateCartOnServer(prodInfo));
    },
    handleRemove(event) {
      event.preventDefault();
      const productId = +ownProps.match.params.productId;
      dispatch(removeProduct(productId, ownProps.history));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));
