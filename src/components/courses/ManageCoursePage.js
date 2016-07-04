import React, { PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './../../actions/actions'
import CourseForm from './CourseForm'

class ManageCoursePage extends React.Component {
  constructor(props,context) {
   super(props, context)

   this.state = {
     course: Object.assign({}, this.props.course),
     errors: {}
   }
 }

 render() {
    return (
      <div>
        <h2>Manage course</h2>
        <CourseForm
        allAuthors={[]}
        course={this.state.course}
        error={this.state.error}
        />
      </div>
   )
 }
}

ManageCoursePage.PropTypes = {
  course: PropTypes.object.isRequired
}

 function mapStateToProps (state, ownprops) {
   let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
    return {
      course: course
    }
   }

 function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
