
const defaultState = {
  courses: [],
  authors: []
}

const mainStore = (state = defaultState, action) => {
  console.log('ACTION:', action.type)
  switch (action.type) {
    case 'LOAD_COURSES_SUCCESS':
      return Object.assign({}, state, {courses: action.courses})

    default:
      console.log(action, 'UNKNOWN ACTION')
      return state
  }
}

export default mainStore
