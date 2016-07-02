import coinbase  from '../api/coinbase.js'
import store  from '../store/configureStore'
import Invoice  from '../api/invoice'
import Coinbase  from '../api/coinbase'
import Organization  from '../api/organization'
import catchAll from '../utils/catch_all'

const actions = {

  getCoinbaseSuccesful : (coinbase) => {
    return { type: 'GET_COINBASE_SUCCESFUL' , coinbase }
  },
  txConfirmed : () => {
    return { type: 'TX_CONFIRMED'}
  },
  txConfirmedDone : () => {
    return { type: 'TX_CONFIRMED_DONE'}
  },
  loadInvoiceSuccesful : (invoices) => {
    return { type: 'LOAD_INVOICES_SUCCESFUL' , invoices }
  }
}

//THUNKS
export function updateInvoicesList() {
  return function (dispatch) {
    return Invoice.all()
    .then((invoices) => {
      dispatch(actions.loadInvoiceSuccesful(invoices))
    })
  }
}

export default actions
