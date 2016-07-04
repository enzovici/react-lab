import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, RouterContext } from 'react-router'
import CourseList from './CourseList'
import CourseListRow from './CourseListRow'


class CoursesPage extends React.Component {
 constructor (props, context) {
   super(props, context)

 }

 courseRow(course, index) {
   return <div key={index}>{course.title}</div>
 }

 render () {
   const courses = this.props.courses
   return (
     <div>
      <h1>Courses</h1>
      <CourseList courses={courses} />
     </div>
   )
 }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

CoursesPage.contextTypes = {
 router: React.PropTypes.object.isRequired
}

function mapStateToProps (state, ownprops) {
 return {
   courses: state.mainStore.courses  //  key is the props, value the store
 }
}

export default connect(mapStateToProps)(CoursesPage)
