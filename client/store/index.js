import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import cart from './cart';
import product from './product'
import users from './users'
import order from './order'
import review from './review';
import orderItem from './orderItem'

const reducer = combineReducers({user, product, cart, users, order, review, orderItem})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './users'
export * from './order'
export * from './cart'
export * from './review'
export * from './orderItem'

