import React, { PropTypes } from 'react'
import InvoiceCreate from './invoice_create'
import InvoicesList from './invoices_list'
import {Accordion} from 'react-bootstrap'
import {Panel} from 'react-bootstrap'

class Invoices extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <div>
        <Accordion>
          <Panel header='New invoice' eventKey='1'>
            <InvoiceCreate />
          </Panel>
        </Accordion>
        <InvoicesList />
      </div>
    )
  }

  //   render () {
  //     let styleToggled = { display: (this.state.formHidden ? "none" : "block" ) }
  //     let styleToggler = { display: (this.state.formHidden ? "block" : "none" ) }
  //     return (
  //       <div>
  //         <Accordion>
  //           <Panel header="New invoice" eventKey="1">
  //             <InvoiceCreate />
  //           </Panel>
  //         </Accordion>
  //         <div>
  //           <div className="right" style={styleToggler}>
  //             <button onClick={this._toggleInvoiceNew}>New Invoice</button>
  //           </div>
  //           <div style={styleToggled}>
  //             <InvoiceCreate />
  //             <div className="formCancel" onClick={this._toggleInvoiceNew}>
  //               or <button className="mini">Cancel</button>
  //           </div>
  //         </div>
  //         <InvoicesList  />
  //       </div>
  //     </div>
  //   )
  // }
  //
  //   _toggleInvoiceNew() {
  //     this.setState({ formHidden: !this.state.formHidden })
  //   }
}

export default Invoices
