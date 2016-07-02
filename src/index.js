import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router' // browserHistory
import actions from './actions/actions'
import configureStore from './store/configureStore'
import routes from './routes'
import Invoice from './api/invoice'
import Coinbase from './api/coinbase'
import catchAll from './utils/catch_all'
import websocketInit from './utils/websocketInit'
//import wrapper from './api/wrapper/wrapper'

//window.t = wrapper // FIXME: disable in production

const store = configureStore()
console.log('store log', store)
window.storeDebug = store.getState() // FIXME: disable in production

// instanciate store
Coinbase.getCoinbase()
  .catch(catchAll)
  .then((res) => {
    store.dispatch(actions.getCoinbaseSuccesful(res.data.data))
  })
  .catch(catchAll)

Invoice.all()
  .catch(catchAll)
  .then((invoices) => {
    store.dispatch(actions.loadInvoiceSuccesful(invoices))
  })
  .catch(catchAll)

websocketInit(store)

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.container')
)
