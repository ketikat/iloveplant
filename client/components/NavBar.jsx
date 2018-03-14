import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const NavBar = (props) => {
    const { handleClick, isLoggedIn, isAdmin, userId } = props

    let cartListItem = (
        <li className="nav-item">
            <Link to="/cart">Cart</Link>
        </li>
    )

    let heading = isAdmin ? 'ILP: Admin' : 'I Love Plant';

    return (
        <header id={isAdmin ? "admin-nav": ''}>

            <Link to="/" id="header-link"><h1>{heading}</h1></Link>
            {
                isAdmin
                ?
                    <ul id="nav-links">
                        <li className="nav-item">
                            <Link to="/users">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/orders">Orders</Link>
                        </li>
                        { cartListItem }
                        <li className="nav-item">
                            <Link to={"/account"}>Account</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" onClick={handleClick}>Logout</a>
                        </li>
                    </ul>
                :
                isLoggedIn
                ?
                    <ul id="nav-links">
                        <li className="nav-item">
                            <Link to="/products">Home</Link>
                        </li>
                        { cartListItem }
                        <li className="nav-item">
                            <Link to="/account">My Account</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" onClick={handleClick}>Logout</a>
                        </li>
                    </ul>
                :
                    <ul id="nav-links">
                        <li className="nav-item">
                            <Link to="/products">Home</Link>
                        </li>
                        { cartListItem }
                        <li className="nav-item">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </ul>
            }
        </header>
    );
};

const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id,
        isAdmin: !!state.user.isAdmin,
        userId: state.user.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(NavBar))
