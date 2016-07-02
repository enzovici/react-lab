import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, RouterContext } from 'react-router'

class InvoicesList extends React.Component {
  constructor (props, context) {
    super(props, context)

    this._transitionToInvoice = this._transitionToInvoice.bind(this);
    // this.invoicesList = this.invoicesList.bind(this)
  }

  invoicesList (invs) {
    let rows = []
    invs.forEach((inv, _) => {
      let invoice = (
        <tr key={`inv_rec_${inv.id}`} onClick={this._transitionToInvoice(inv.id)}>
          <td>{inv.id}</td>
          <td>{inv.details.status}</td>
          <td>{inv.details.terms.amount} £</td>
        </tr>
      )
      rows.push(invoice)
    })
    return rows
  }

  render () {
    //console.log('rendered InvoiceList component')
    let invoices = this.props.mainStore.invoices
    return (
      <div>
        <h3>Invoices</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.invoicesList(invoices)}
          </tbody>
        </table>
      </div>
    )
  }

  _transitionToInvoice(id) {
    return () => {
      this.context.router.push(`/invoices/${id}`)
    }
  }
}

InvoicesList.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapStateToProps (state, ownprops) {
  return {
    mainStore: state.mainStore  //  key is the props, value the store
  }
}

export default connect(mapStateToProps)(InvoicesList)
