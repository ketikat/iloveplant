import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchUser, fetchOtherUser, deleteUser, updateUser } from '../store'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
class ViewUser extends Component {


  componentDidMount() {
    this.props.getOtherUser(this.props.urlUserId)

  }

  render() {

    let user = this.props.currentUser
    let info = +this.props.match


    return (

              <div id="edit-user-container">


                {
                  (user.email) && (user.id === +this.props.urlUserId) &&

                    <div>
                    <h3>{ user.name }</h3>
                    <h5>E-mail: { user.email }</h5>
                    <h5>Address: { user.address } </h5>
                    <br/>

                    {
                      !user.isAdmin?
                      <div id="edit-user-buttons">
                        <button className="btn btn-sm btn-info" onClick={this.props.handlePassword}>
                          Prompt Password Reset
                        </button>

                        <button className="btn btn-sm btn-danger" onClick={this.props.handleRemove}>Remove This User
                        </button>

                        <button className="btn  btn-sm btn-success" onClick={this.props.handleUpdate}>Make User Admin
                        </button>
                      </div>
                      :
                      null
                    }

                  <div id="edit-user-form-container">
                    <h3>Edit Profile</h3>
                    <div id="edit-user-form">
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="edit-user-form">
                          <label>Name</label>
                          <input type="text" defaultValue={`${user.name}`} name="name" placeholder="Name" />
                          </div>

                        <div className="edit-user-form">
                          <label>E-mail</label>
                          <input type="text" defaultValue={`${user.email}`} name="email" placeholder="E-mail" />
                        </div>

                        <div className="edit-user-form">
                          <label>Address</label>
                          <input type="text" defaultValue={`${user.address}`} name= "address" placeholder="Address" />
                        </div>

                        <button className="btn btn-sm btn-primary btn-block" type="submit">Submit
                        </button>
                    </form>
                    </div>
                  </div>
                   </div>
              }





            </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    currentUser: state.users.currentUser,
    urlUserId: ownProps.match.params.userId
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getOtherUser(id) {
      const userThunk = fetchOtherUser(id)
      dispatch(userThunk)
    },
    handleRemove(event) {
      event.preventDefault();
      dispatch(deleteUser(+ownProps.match.params.userId, ownProps.history))
    },
    handleUpdate(event) {
      event.preventDefault();
      const updatedData = { isAdmin: true }
      dispatch(updateUser(+ownProps.match.params.userId, updatedData, ownProps.history))
    },
    handleSubmit(event) {
      event.preventDefault();
      const updatedData = {
        name: event.target.name.value,
        email: event.target.email.value,
        address: event.target.address.value
      }
      dispatch(updateUser(+ownProps.match.params.userId, updatedData, ownProps.history))
    },
    handlePassword(event) {
      event.preventDefault();
      const updatedData = { resetPassword: true }
      dispatch(updateUser(+ownProps.match.params.userId, updatedData, ownProps.history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ViewUser))
