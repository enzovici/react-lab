import React from 'react'
import { connect } from 'react-redux'

class OrganizationsSelect extends React.Component {
  organizations() {
    let orgs = this.props.mainStore.coinbase.organizations
    let rows = []
    orgs.forEach((org) => {
      rows.push(
        <option key={`org_select_${org.id}`} value={org.id}>{org.details.profile.name}</option>
      )
    })
    return rows
  }

  render() {
    return (
      <select name={this.props.name}>
        {this.organizations()}
      </select>
    )
  }
}

  function mapStateToProps(state, ownprops) {
    return {
      mainStore : state.mainStore   //  key is the props, value the store
    }
  }
  
  //mapDispatchToProps??
  export default connect(mapStateToProps)(OrganizationsSelect)
