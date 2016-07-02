import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'

class Invoice extends React.Component {
  render() {
    let id = this.props.params.id
    let invoices = this.props.mainStore.invoices
    let invoice = _(invoices).find((inv) => {
      return inv.id == id
    })
    return (
      <div>
        <h3>Invoice ID ({id})</h3>
        <div>
          <p>Status: {invoice.details.status}</p>
          <p>Amount: {invoice.details.terms.amount} £</p>
          <p>Type: {invoice.kind}</p>
        </div>
        <div>
          <a href='{invoice.links.sender}'> Sender </a>
          <p>ID: {invoice.sender.id}</p>
          <p>Type: {invoice.sender.kind} </p>
          <p>Address: {invoice.sender.owner.address}</p>
        </div>
        <div>
          <a href='{invoice.links.sender}'> Recipient </a>
          <p>ID: {invoice.recipient.id}</p>
          <p>Type: {invoice.recipient.kind} </p>
          <p>Address: {invoice.recipient.owner.address}</p>
        </div>
        <div>
          <p>Amount: {invoice.details.terms.amount} £</p>
          <p>Status: {invoice.details.status}</p>
          <p>Amount: {invoice.details.terms.amount} £</p>
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

export default connect(mapStateToProps)(Invoice)
