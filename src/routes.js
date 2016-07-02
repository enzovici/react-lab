import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Dashboard from './components/dashboard/dashboard'
import Invoices from './components/invoices/invoices'
import Invoice from './components/invoices/invoice'
import Organizations from './components/organizations/organizations'
import Organization from './components/organizations/organization'
import NotFound from './components/common/not_found'


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Dashboard} />
    <Route path='/invoices' component={Invoices} />
    <Route path='/organizations' component={Organizations} />

    <Route path="/invoices/:id" component={Invoice}/>
    <Route path="/organizations/:id" component={Organization}/>

    <Route path='*' component={NotFound} />

  </Route>
 )
