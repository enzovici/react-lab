import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  constructor (props, context) {
    super(props, context)
  }



  render () {
    return (

      <div>
        <h3>DAshboard:</h3>
      </div>
    )
  }
}

function mapStateToProps (state, ownprops) {
  return {
    mainStore: state.mainStore   //  key is the props, value the store
  }
}

export default connect(mapStateToProps)(Dashboard)
