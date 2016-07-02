import actions from '../actions/actions'
import _ from 'underscore'

var PENDING_TXST, socket, updateStatusDebounced, wsHost

// Notifier
const updateStatus = (store, status) => {
  if (!status) return
  if (status == "PONG") return
  if (status == "tx_latest") {
    store.dispatch(actions.txConfirmed())

    setTimeout(() => {
      store.dispatch(actions.txConfirmedDone())
    }, 9000)
  }
}

updateStatusDebounced = _.debounce(updateStatus, 2000)

const websocketInit = (store) => {

  // wsHost = "localhost:3201"
  wsHost = "localhost:3001"

  // if (APP_ENV === "prod") {
  //   wsHost = "PRODHOST:PROD"
  // }

  socket = new WebSocket("ws://" + wsHost)

  socket.onopen = function() {
    return console.log("PING")
  }

  socket.onmessage = function(event) {
    var status
    status = event.data
    // c.log("WS EVENT RECEIVED: " + status)
    if (status) {
      updateStatusDebounced(store, status)
      if (status === "tx_pending") {
        PENDING_TXST = true
        _.delay(function() {
          if (PENDING_TXST) {
            return updateStatusDebounced(store, null)
          }
        }, 10000)
      }
      if (status === "tx_latest") {
        if (PENDING_TXST) {
          updateStatus(store, status)
        }
        PENDING_TXST = null
        return _.delay(function() {
          return updateStatusDebounced(store, null)
        }, 3000)
      }
    }
  }
}

export default websocketInit
