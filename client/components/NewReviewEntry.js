import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProduct, postReview } from "../store/index";

class NewReviewEntry extends Component {
    constructor(props) {
        super(props)
        this.state = { starValue: 3 }
        this.onChange= this.onChange.bind(this)
        this.makeStars= this.makeStars.bind(this)
    }

    componentDidMount() {
        this.props.loadProductData();
    }


    onChange (event) {
      const newValue = event.target.value
      this.setState({starValue: newValue})
    }


    makeStars () {
      let starArr = []
      for (let i = 0; i < this.state.starValue; i++) {
        starArr.push(
          <img
            key={i}
            className="star-image"
            src="https://i.imgur.com/GE6i7ZM.png"
          />
        )
      }
      return starArr
    }



    render() {
        const product = this.props.productData;


this.refs.stars && console.log("adaSDasdaS", this.refs.stars.selectedValue)

        return (
           <div id="reviewForm" >
                <h3>REVIEW</h3>
            <form  onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                <div id="reviewItemName">
                    <label htmlFor="name">Enter Your Review for:</label>
                    <p>{product.name}</p>
                </div>
                    <textarea id="reviewArea"
                        defaultValue={''}
                        className="form-control"
                        type="text"
                        name="reviewContent"
                        placeholder="Enter Review"
                    />
                </div>
                <p>Select Star Rating</p>
                <div id="starRating">
                <label htmlFor="stars">{this.makeStars()}</label>
                <select ref="stars" defaultValue="3" name="rating" onChange={this.onChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Submit Review</button>
                </div>
            </form>

            </div>

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

