"use strict";
import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { wipeNewOrder } from "../store";
import axios from "axios";

class OrderSuccess extends Component {
 constructor(props) {
      super(props);
      this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount(){
    axios.post('/api/sendEmail/confirmation', {email: this.props.newOrder.orderEmail, orderId: this.props.orderId, total: this.props.newOrder.orderTotal})
        .then(res => res.data)
        .catch(err => console.log(err));
  }

  render() {
    const { orderId, isLoggedIn, userId, name} = this.props

    return (
      <div>
        <h3>Success! You placed your order.</h3>
        
        { 
          isLoggedIn?
          <div>
            <p>{`Thanks, ${name}!`}</p>
             <p>An email with your order will be sent shortly!</p>
            <span> 
              <Link to={`/orders/${orderId}`} onClick={this.props.handleOrderView}>
                <p>View your order</p>
              </Link>
            </span> 
          </div>
          :
          <div>
            <p>{`Thanks!`}</p>
            <p>An email with your order will be sent shortly!</p>
          </div>
        }
        
      </div>
    );
  };
}

const mapState = state => {
  return {
    orderId: state.order.newOrder.id,
    newOrder: state.order.newOrder,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    name: state.user.name
  };
};

const mapDispatch = dispatch => {
  return {
    handleOrderView() {
      dispatch(wipeNewOrder());
    }
  };
};

const OrderSuccessContainer = connect(mapState, mapDispatch)(OrderSuccess);

export default OrderSuccessContainer;
