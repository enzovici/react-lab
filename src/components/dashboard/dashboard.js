import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  subOrgList (orgs) {
    let rows = []
    orgs.forEach((org, _) => {
      let organization
      organization = (<p key={`org_rec_${org.id}`} organization={org}> {org.details.profile.name} </p>)
      rows.push(organization)
    })
    return rows
  }

  render () {
    let coinbase = this.props.mainStore.coinbase
    return (

      <div>
        <h3>Organizations:</h3>
        <div>{this.subOrgList(coinbase.organizations)}</div>
        <div className='s40'></div>
        <p>coinbase: {coinbase.coinbase} </p>
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
