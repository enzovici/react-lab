import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, RouterContext } from 'react-router';

class OrganizationList extends React.Component {
  constructor (props, context) {
    super(props, context)

    this._transitionToOrg = this._transitionToOrg.bind(this);
  }

  orgList (orgs) {
    let rows = []
    orgs.forEach((org, _) => {
      let organization = (
        <tr key={`org_${org.id}`} onClick={this._transitionToOrg(org.id)}>
          <td>{org.id}</td>
          <td>{org.details.profile.name}</td>
        </tr>
      )
      rows.push(organization)
    })
    return rows
  }

  render() {
    let coinbase = this.props.mainStore.coinbase
    return (
      <div>
        <h3>Organizations</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.orgList(coinbase.organizations)}
          </tbody>
        </table>

      </div>
    )
  }

  _transitionToOrg(id) {
    return () => {
      this.context.router.push(`/organizations/${id}`)
    }
  }
}

OrganizationList.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps (state, ownprops) {
  return {
    mainStore: state.mainStore   //  key is the props, value the store
  }
}

export default connect(mapStateToProps)(OrganizationList)
