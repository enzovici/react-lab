import React from 'react'
import serialize from '../../utils/serialize'

export default class OrganizationCreate extends React.Component {
  render () {
    return (
      <div>
        <h5>New Organization</h5>
        <form id='organization_create' onSubmit={this.createOrganization}>
          <select name='type'>
            <option value='1'>Company</option>
            <option value='2'>Bank</option>
          </select>
          <input type='text' placeholder='org_name' name='name' />
          <input type='text' placeholder='org_country' name='countryCode' />
          <input type='submit' value='Create' />
        </form>
      </div>
    )
  }

  createOrganization (evt) {
    evt.preventDefault()
    let data = serialize('#organization_create')
  }
}
