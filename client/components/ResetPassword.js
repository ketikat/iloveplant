import React, { Component } from 'react'
import {connect} from 'react-redux'
import { me } from '../store'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
class ResetPassword extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    let user = this.props.user
    return (
      <div>
      <h3>Hi {user.name}, please update your password</h3>
      <button onClick={this.props.handlePassword}>Change Password</button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    handlePassword(event) {
      event.preventDefault();
      const updatedData = { resetPassword: false }
      //dispatch() thunk to update me() does not exist
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ResetPassword))
