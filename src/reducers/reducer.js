
const defaultState = {
  testfield: {},
  coinbase: {
    organizations: []
  },
  invoices: [],
  organizations: [],
  invoice: {},
  organization: {},
  tx_confirmed: false,
  ws_update: false
}

const mainStore = (state = defaultState, action) => {
  console.log('ACTION:', action.type)
  switch (action.type) {
    case 'LOAD_INVOICES_SUCCESFUL':
      return Object.assign({}, state, {invoices: action.invoices})

    case 'GET_COINBASE_SUCCESFUL':
      return Object.assign({}, state, {coinbase: action.coinbase})

    default:
      console.log(action, 'UNKNOWN ACTION')
      return state
  }
}

export default mainStore
