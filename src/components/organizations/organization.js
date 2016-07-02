import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'

class Organization extends React.Component {
  render() {
    let id = this.props.params.id
    let organizations = this.props.mainStore.coinbase.organizations
    let organization = _(organizations).find((org) => {
      return org.id == id
    })
    return (
      <div>
        <h3>Organization ID ({id})</h3>
        <div>
          <p>Address: {organization.owner.address}</p>
          <p>Kind: {organization.kind} </p>
        </div>

        <div>
          PROFILE
          <p>Name: {organization.details.profile.name}</p>
          <p>Country Code: {organization.details.profile.country.code} </p>
          <p>Country: {organization.details.profile.country.name} </p>
        </div>

        <div>
          MAPPING
          <p>VATIN: {organization.mapping.provider}</p>
          <p>CIN: {organization.mapping.reference} £</p>
        </div>


      </div>
    )
  }
}


function mapStateToProps (state, ownprops) {
  return {
    mainStore: state.mainStore
  }
}

export default connect(mapStateToProps)(Organization)

// <div>
//   IDENTITY
//<p>VATIN: {organization.identity.VATIN ? organization.identity.VATIN : null}</p> //use tern operator(insetad of ext if statemnt) for optional values
//   <p>CIN: {organization.identity.CIN} £</p>
//   <p>CRN: {organization.identity.CRN}</p>
// </div>
// <div>
//   CONTACTS
//   <p>Name: {organization.contacts.name}</p>
//   <p>email: {organization.contacts.email} £</p>
//   <p>phone: {organization.constacts.phone}</p>
// </div>
