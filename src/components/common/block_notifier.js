import React from 'react'
import { connect } from 'react-redux'

class BlockNotifier extends React.Component {
  render() {
    let updating = this.props.txStore.updating
    return (<div className="blockNotifier">
      <div>Blockchain Status:</div>
      <div>
        <strong>
          {(updating) ? "New Block Confirmed" : "Waiting for a new block"}
        </strong>
      </div>
    </div>)
  }
}

function mapStateToProps(state, ownprops) {
  return {
    txStore : state.txStore
  }
}

export default connect(mapStateToProps)(BlockNotifier)
