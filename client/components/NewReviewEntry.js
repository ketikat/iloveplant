import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProduct, postReview } from "../store/index";

class NewReviewEntry extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadProductData();
    }

    render() {
        const product = this.props.productData;

        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Enter Your Review for: {product.name}</label>
                    <textarea
                        defaultValue={''}
                        className="form-control"
                        type="text"
                        name="reviewContent"
                        placeholder="Enter Review"
                    />
                </div>
                <select defaultValue="" name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                </select>
                <div className="form-group">
                    <button type="submit">Submit Review</button>
                </div>
            </form>

        );
    }
}

const mapState = (state) => {
    return {
        productData: state.product.currentProduct
    };
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        loadProductData() {
            const productThunk = fetchProduct(ownProps.match.params.productId);
            dispatch(productThunk);
        },
        handleSubmit(event) {
            event.preventDefault();
            const reviewData = {
                content: event.target.reviewContent.value,
                rating: event.target.rating.value,
                productId: ownProps.match.params.productId
            }
            const history = ownProps.history;
            dispatch(postReview(reviewData, history));
        }
    };
};

export default withRouter(connect(mapState, mapDispatch)(NewReviewEntry))

