import React from 'react'
import OrganizationCreate from './organization_create'
import OrganizationList from './organization_list'
import {Accordion} from 'react-bootstrap'
import {Panel} from 'react-bootstrap'

export default class Organizations extends React.Component {
  constructor (props, context) {
    super(props, context)
  }
  render () {
    return (
      <div>
        <Accordion>
          <Panel header='New organization' eventKey='1'>
            <OrganizationCreate />
          </Panel>
        </Accordion>
        <OrganizationList />
      </div>
    )
  }
}
