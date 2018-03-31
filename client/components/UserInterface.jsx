import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Route, Switch } from 'react-router-dom'
import { me, fetchProducts, fetchCategories, setSearchQuery, fetchReviews } from '../store'
import { Login, Signup, UserHome, NavBar } from './'
import ManyProducts from './ManyProducts';

import OrderSuccess from './OrderSuccess';
import Cart from './Cart';
import Checkout from './Checkout';
import ManyUsers from './ManyUsers';
import SingleUser from './SingleUser';
import ViewUser from './ViewUser';
import SingleProduct from './SingleProduct';
import SingleOrder from './SingleOrder';
import ManyOrders from './ManyOrders';
import NewReviewEntry from './NewReviewEntry'
import OrderChart from './OrderChart';
import EditProduct from './EditProduct';
import NewProductEntry from './NewProductEntry';
import ResetPassword from './ResetPassword';
//import { URLSearchParams } from 'url';


class UserInterface extends Component {

    componentDidMount() {
        this.props.loadInitialData()
        const params = new URLSearchParams(this.props.location.search);
        if (params.has('query')) {
            this.props.dispatchSearchQuery(params.get('query')) //this method sets the query on the state from what is grabbed in the url
        }
    }

    render() {
        console.log("STATE :", this.state)
        const { isLoggedIn, isAdmin, resetPassword } = this.props

        return (
            <div>
                <NavBar />
                <main>
                    <Switch>
                    {/* Routes placed here are available to all visitors */}

                    {/* this should not be available to all users, but this page is loaded before anything is known about the user, so first isAdmin is false so route is not there yet and it is defaulted to product page. */}
                        <Route exact path="/products/add/" component={NewProductEntry} />
                        <Route exact path="/" component={ManyProducts} />
                        <Route exact path="/products" component={ManyProducts} />
                        <Route exact path="/products/:productId" component={SingleProduct} />
                        <Route exact path="/reviews/new-review/:productId" component={NewReviewEntry} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/checkout" component={Checkout} />
                        <Route path="/checkout/order-success" component={OrderSuccess} />
                        <Route path="/orders/:orderId" component={SingleOrder} />
                        {/*
                            (isLoggedIn && resetPassword) &&
                            <Switch>
                                <Route path="/" component={ResetPassword} />
                            </Switch>
                        */}
                        {
                            isAdmin &&
                            <Switch>
                                {/* Routes placed here are only available if user is an admin */}
                                <Route path="/home" component={ManyProducts} />
                                {/*need to change /home path to go to our admin dashboard if we make one*/}
                                <Route exact path="/dash-orders" component={OrderChart} />
                                <Route exact path="/account" component={SingleUser} />
                                <Route exact path="/orders" component={ManyOrders} />
                                <Route path="/orders/:orderId" component={SingleOrder} />
                                <Route exact path="/users" component={ManyUsers} />
                                <Route path="/users/:userId" component={ViewUser} />
                                <Route path="/products/:productId/edit" component={EditProduct} />
                                {/*need to add: <Route path="reviews" and render a review component*/}
                            </Switch>
                        }
                        {
                            isLoggedIn &&
                            <Switch>
                                {/* Routes placed here are only available after logging in */}
                                <Route path="/home" component={ManyProducts} />
                                <Route exact path="/account" component={SingleUser} />
                                <Route exact path="/orders" component={ManyOrders} />
                                <Route path="/users/:userId" component={ViewUser} />
                                {/* <Route path="/orders/:orderId" component={SingleOrder} />*/}
                            </Switch>
                        }
                        {/* Displays our Login component as a fallback */}
                        <Route component={Login} />

                    </Switch>
                </main>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id,
        isAdmin: !!state.user.isAdmin,
        name:!!state.user.name,
        resetPassword: !!state.user.resetPassword
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(me())
            dispatch(fetchProducts())
            dispatch(fetchCategories())
            dispatch(fetchReviews())
        },
        dispatchSearchQuery(search) {
            dispatch(setSearchQuery(search));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserInterface))

