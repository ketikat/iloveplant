import axios from 'axios'

/**
* ACTION TYPES
*/

// for ADMIN users:
const GET_ITEMS = 'GET_ITEMS'



/**
* INITIAL STATE
*/
const initialState = {
  orderItems: []
}

/**
* ACTION CREATORS
*/

const getItems = (items) => ({type: GET_ITEMS, items})


/**
* THUNK CREATORS
*/
// if user isAdmin they can view all orders, isLogged in can view just their orders,
// or if not logged in then can't see any orders
export function fetchOrderItems () {
  return function thunk (dispatch) {
    return axios.get('/api/order-items')
      .then(res => res.data)
      .then(items => {
        const action = getItems(items)
        dispatch(action)
      })
      .catch(err => console.log(err))
    }
  }


/**
* REDUCER
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return Object.assign({}, state, { orderItems: action.items });
    default:
      return state
  }
}


