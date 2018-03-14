import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchOrders } from '../store'
import ManyOrders from './ManyOrders'
import ViewUser from './ViewUser'
import { withRouter, Link } from 'react-router-dom'

/**
 * COMPONENT
 */
class SingleUser extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { name, email, address, orders, id } = this.props
    return (
      <div>
        <h3>Name: { name }</h3>
        <h5>E-mail: { email }</h5>
        <h5>Address: { address }</h5>
        <ManyOrders />
        <Link to={`/users/${id}`}>
          <button className="btn  btn-sm btn-secondary">
            Edit my Account
          </button>
        </Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.user.name,
    email: state.user.email,
    address: state.user.address,
    orders: state.order.orders,
    id: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchOrders())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleUser))
