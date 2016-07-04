import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import {loadCourses} from './actions/actions'
import configureStore from './store/configureStore.dev'
import catchAll from './utils/catch_all'


const store = configureStore()
console.log('store log', store)
window.storeDebug = store.getState() // FIXME: disable in production

// instanciate store
store.dispatch(loadCourses())

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.container')
)
