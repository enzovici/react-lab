import React from 'react'
import TextInput from '../../components/common/TextInput'
import SelectInput from '../../components/common/SelectInput'

const CourseForm = ({course, allAuthors, onSave, onChange,loading, errors}) => {
  return(
    <form>
      <h2>Manage Course</h2>
      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title}/>

        <SelectInput
          name="authorId"
          label="Author"
          value={course.authorId}
          defaultOption="Select author"
          options={allAuthors}
          onChange={onChange}
          error={errors.title}/>

        <TextInput
          name="category"
          label="Category"
          value={course.category}
          onChange={onChange}
          error={errors.category}/>

        <TextInput
          name="length"
          label="Lenght"
          value={course.length}
          onChange={onChange}
          error={errors.length}/>

        <Input
          type="submit"
          disabled="loading"
          value={loading ? 'Saving...' : 'Save'}
          className='btn btn-primary'
          onClick={onSave}/>
    </form>
  )

}

CourseForm.propTypes = {
  course: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  errors: React.PropTypes.object.isRequired
}

export default CourseForm
