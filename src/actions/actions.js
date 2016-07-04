import courseApi from './../api/mock/mockCourseApi'
import catchAll from '../utils/catch_all'

const actions = {
  loadCourseSuccess : (courses) => {
    return { type: 'LOAD_COURSES_SUCCESS' , courses }
  }
}

//THUNKS
export function loadCourses() {
  return function (dispatch) {
    return courseApi.getAllCourses()
    .then((courses) => {
      dispatch(actions.loadCourseSuccess(courses ))
    })
  }
}

export default actions
