import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const GET_OTHER_USER = 'GET_SINGLE_USER'
const REMOVE_SINGLE_USER = 'REMOVE_SINGLE_USER'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
    users: [],
    currentUser: {},
    otherUser: {}
}

/**
 * ACTION CREATORS
 */
const getUsers = users => ({ type: GET_USERS, users })
const getSingleUser = user => ({ type: GET_SINGLE_USER, user })
const getOtherUser = user => ({ type: GET_OTHER_USER, user })
const removeSingleUser = user => ({ type: REMOVE_SINGLE_USER, user })
const updateSingleUser = user => ({ type: UPDATE_SINGLE_USER, user })

/**
 * THUNK CREATORS
 */
export function fetchUsers() {
  return function thunk(dispatch) {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        const action = getUsers(users);
        dispatch(action);
      })
      .catch(error => console.log(error));
  };
}

export function fetchUser(userId) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${userId}`)
      .then(res => res.data)
      .then(user => {
        const action = getSingleUser(user);
        dispatch(action);
        history.push(`/users/${userId}`)
      })
      .catch(error => console.log(error));
  };
}


export function fetchOtherUser(userId) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${userId}`)
      .then(res => res.data)
      .then(user => {
        const action = getOtherUser(user);
        dispatch(action);
      })
      .catch(error => console.log(error));
  };
}



export function deleteUser(userId, history) {
  return function thunk(dispatch) {
    return axios.delete(`/api/users/${userId}`)
      .then(() => {
        const action = removeSingleUser(userId)
        dispatch(action)
        history.push('/users')
      })
      .catch(error => console.log(error))
  };
}

export function updateUser(userId, data, history) {
  return function thunk(dispatch) {
    return axios.put(`/api/users/${userId}`, data)
      .then(res => res.data)
      .then(user => {
        const action = updateSingleUser(user);
        dispatch(action)
        history.push('/users')
      })
      .catch(error => console.log(error));
  };
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, { users: action.users });
    case GET_SINGLE_USER:
      return Object.assign({}, state, { currentUser: action.user })

    case GET_OTHER_USER:
      return Object.assign({}, state, { otherUser: action.user })

    case UPDATE_SINGLE_USER:
      return Object.assign({}, state, { currentUser: action.user })
    case REMOVE_SINGLE_USER:
      const userId = action.user
      const remainingUsersArray = state.users.filter(user => {
        return user.id !== userId
      })
      return Object.assign({}, state, { users: remainingUsersArray })
    default:
      return state
  }
}
