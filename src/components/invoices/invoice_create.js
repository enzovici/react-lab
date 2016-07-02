import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import mainStore  from '../../reducers/reducer'
import OrganizationsSelect from '../common/organizations_select'
import serialize from '../../utils/serialize'
import Invoice from '../../api/invoice'
import catchAll from '../../utils/catch_all'
import configureStore from '../../store/configureStore'
import actions from '../../actions/actions'
import {updateInvoicesList} from '../../actions/actions'
import 'react-date-picker/index.css'
import { DateField, TransitionView, Calendar } from 'react-date-picker'

class InvoiceCreate extends React.Component {
  constructor(props,context) {
   super(props, context)

   this.createInvoice = this.createInvoice.bind(this) //don't forget to bind this in functions
 }

 render() {
    return (

     <div>
       <h5>New Invoice</h5>
       <form id="invoice_create">
         <input type='text' name="amount" placeholder='amount' />
         <DateField
           name='dueDate'
           defaultValue={"2016-05-30"}
           dateFormat="YYYY-MM-DD"
           onChange={(dateString, { dateMoment, timestamp}) => {return window.dueDate=dateString}}

           >
           <TransitionView>
             <Calendar style={{padding: 10}}/>
           </TransitionView>
         </DateField>
         <select name="currency">
           <option>GBP</option>
           <option>USD</option>
           <option>EUR</option>
         </select>

         <select name="kind">
           <option value='Invoice'>Invoice</option>
           <option value='CreditNote'>Credit note</option>
         </select>

         <OrganizationsSelect name="recipient" />
         <input type='button' onClick={this.createInvoice} value="Create" />
       </form>
     </div>
   )
 }

    createInvoice() {
    let data = serialize("#invoice_create")
    let sender = this.props.mainStore.coinbase.organizations[0]
    data.sender = sender.id
    data.dueDate = window.dueDate
    data.amount = Number(data.amount)
    data.kind = String(data.kind)
    console.log('....................................',data)
    Invoice.create(data)
    .catch(catchAll)
    .then( () => {
      console.log("Invoice.create():")
      this.props.dispatch(updateInvoicesList())
      })
      .catch(catchAll)
     }
}

  function mapStateToProps(state, ownprops) {
    return {
      mainStore : state.mainStore
      }
  }

  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
      onClick: () => dispatch(updateInvoiceList())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceCreate)
