import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { UserInterface } from './components'
import { Router } from 'react-router-dom';
import history from './history'


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <UserInterface />
    </Router>
  </Provider>,
  document.getElementById('app')
)
