import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Dashboard from './components/dashboard/dashboard'
import CoursesPage from './components/courses/CoursesPage'
import ManageCoursePage from './components/courses/ManageCoursePage'
import NotFound from './components/common/not_found'


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Dashboard} />
    <Route path='courses' component={CoursesPage} />
    <Route path='course' component={ManageCoursePage} />
    <Route path='course/:id' component={ManageCoursePage} />
    <Route path='*' component={NotFound} />

  </Route>
 )
