import base from './base'
import Assets from './assets'
import Coinbase from './coinbase'
import Files from './files'
import Invoice from './invoice'
import Organization from './organization'
import Status from './status'
import STUB_INVOICE from './mock/stub_invoice'
import STUB_ORGS from './mock/stub_orgs'
import Transactions from './transactions'
import catchAll from '../utils/catch_all'

const DELAY = 0

const catchAll = (err) => {
  console.error("Error:", err)
  return Promise.reject(err)
}

const testAPI = () => {
  console.log('################### DATA MODELS ##################')

Coinbase.getCoinbase()
.catch(catchAll)
.then((res) => {
  console.log('Coinbase:', res)
})
.catch(catchAll)

Status.getStatus()
.catch(catchAll)
.then((res) => {
  console.log('API Status:', res)
})
.catch(catchAll)


//INVOICES
// todo: create, update, assets.*

Invoice.get(2)
.catch(catchAll)
.then((res) => {
  console.log('Invoice: getById():', res)
})
.catch(catchAll)

Invoice.count()
.catch(catchAll)
.then((res) => {
  console.log('Invoice: count():', res)
})
.catch(catchAll)

Invoice.all()
.catch(catchAll)
.then((res) => {
  console.log('Invoice: all():', res)
})
.catch(catchAll)


//ORGANIZATIONS
//todo:   create, updateProfile, getByReference

Organization.getById(1)
.catch(catchAll)
.then((res) => {
  console.log('Organizations: getById():', res)
})
.catch(catchAll)


Organization.all()
.catch(catchAll)
.then((res) => {
      console.log('Organizations: all():', res) //todo: paging
    })
.catch(catchAll)


// Organization.getByReference)(null,null)
//   .catch(catchAll)
//   .then((res) => {
//       console.log('getByReference:', res)
//     })
//   .catch(catchAll)



//todo:
//ASSETS
//TRANSACTIONS
//FILES



}

export default testAPI
