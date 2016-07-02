import { combineReducers } from 'redux'
import mainStore from './reducer'
import txStore from './tx_reducer'

const rootReducer = combineReducers({
  mainStore,
  txStore
})

export default rootReducer
