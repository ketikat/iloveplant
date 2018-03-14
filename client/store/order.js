import axios from 'axios'
import historyThing from "../history";

/**
* ACTION TYPES
*/
const EDIT_ORDER = 'EDIT_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const WIPE_NEW_ORDER_FROM_STATE = 'WIPE_NEW_ORDER_FROM_STATE';
const GET_ORDER = 'GET_ORDER'
const GET_ORDERS = 'GET_ORDERS'


/**
* INITIAL STATE
*/
const initialOrderState = {
  order: {},
  orders: [],
  newOrder: {}
}

/**
* ACTION CREATORS
*/
const getOrder = order => ({type: GET_ORDER, order})
const getOrders = orders => ({type: GET_ORDERS, orders})
const createOrder = newOrder => ({type: CREATE_ORDER, newOrder})
export const wipeNewOrder = () => ({type: WIPE_NEW_ORDER_FROM_STATE});

/**
* THUNK CREATORS
*/
// if user isAdmin they can view all orders, isLogged in can view just their orders,
// or if not logged in then can't see any orders
export function fetchOrders () {
  return function thunk (dispatch) {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders)
        dispatch(action)
      })
      .catch(err => console.log(err))
    }
  }

// if user isAdmin they can view any order, isLogged in can view just their own order individually,
// or if not logged in then can't see any orders
export function fetchOrder(orderId) {
  return function thunk (dispatch) {
    return axios.get(`/api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => {
        const action = getOrder(order)
        dispatch(action)
      })
      .catch(err => console.log(err))
    }
  }


export function editOrder(orderId, orderStatus) {
  return function thunk (dispatch) {
    return axios.put(`/api/orders/${orderId}`, orderStatus)
      .then(res => res.data)
      .then(order => {
        const action = getOrder(order)
        dispatch(action)
        // historyThing.push(`/orders/${orderId}`)
      })
      .catch(err => console.log(err))
    }
  }



export function createOrderOnServer(orderInfo, history) {
  return function thunk(dispatch) {
    return axios.post('/api/orders', orderInfo)
    .then(res => res.data)
    .then(newOrder => {
      const action = createOrder(newOrder);
      dispatch(action);
      history.push('/checkout/order-success')
    })
    .catch(err => console.log(err));
  }
}

/**
* REDUCER
*/
export default function (state = initialOrderState, action) {
  switch (action.type) {
    case GET_ORDER:
      return Object.assign({}, state, {order: action.order});
    case GET_ORDERS:
      return Object.assign({}, state, {orders: action.orders});
    case CREATE_ORDER:
      return Object.assign({}, state, {newOrder: action.newOrder});
    case WIPE_NEW_ORDER_FROM_STATE:
      return Object.assign({}, state, {newOrder: {}})
    default:
      return state
  }
}


