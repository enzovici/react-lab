
const defaultState = {
  updating: false
}

const txStore = (state = defaultState, action) => {
  console.log('ACTION:', action.type)
  switch (action.type) {

    case 'TX_CONFIRMED':
      return Object.assign({}, state, {updating: true})

    case 'TX_CONFIRMED_DONE':
      return Object.assign({}, state, {updating: false})

    default:
      console.log(action, 'NO TX ACTION')
      return state
  }
}

export default txStore
