import React from 'react';

import isEmail from 'validator/lib/isEmail';

class SignUpForm extends React.Component {

  state = {
    people: [],
    fields : {
      name: '',
      email: '',
      department: '',
      course: ''
    },
    fieldErrors: {}
  }

  onInputChange = ({ name, value, error }) => {
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);

    fields[name] = value;
    fieldErrors[name] = error;

    // Reset course if department is changed
    if (name === 'department' && this.state.fields.department !== value) {
      fields['course'] = '';
    }

    this.setState({ fields, fieldErrors });
  }

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    // Check keys in fieldErrors & construct new array if key has value
    const errMessages = Object.keys(fieldErrors).filter((key) => fieldErrors[key]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (!person.department) return true;
    if (!person.course) return true;
    // Check if errors present
    if (errMessages.length) return true;

    return false;
  }

  onFormSubmit = (evt) => {
    const people = [...this.state.people];
    const person = this.state.fields;
    evt.preventDefault();

    // Exit if fieldErrors
    if (this.validate()) return;

    this.setState({
      people: people.concat(person), // Add person to people
      fields: { // Reset fields
        name: '',
        email: '',
        department: '',
        course: ''
      }
    });
    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Sign Up App</h1>
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            validate={value => value ? false : 'Name is required.'}
            onChange={this.onInputChange}
          />
          <br/>
          <Field
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            validate={value => isEmail(value) ? false : 'Invalid email.'}
            onChange={this.onInputChange}
          />
          <br/>
          <CourseSelect
            onChange={this.onInputChange}
            department={this.state.fields.department}
            course={this.state.fields.course}
          />
          <br/>
          <input
            type='submit' disabled={this.validate()}
          />
        </form>

        <ul>
          <h3>Participants</h3>
          {this.state.people.map(({name, email, department, course}, i) => {
            return <li key={i}>{name} {email} - { department } / { course }</li>;
          })}
        </ul>
      </div>
    )
  }
}

export default SignUpForm;

class Field extends React.Component {

  state = {
    value: this.props.value,
    error: false
  }

  // Enables clearing of the fields after successful submission
  static getDerivedStateFromProps(nextProps) {
    return { value: nextProps.value }
  }

  onChange = (evt) => {
    const name = this.props.name;
    const value = evt.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    // Pass values to the form onInputChange
    this.props.onChange({ name, value, error });
  }

  render() {
    return (
      <>
        <input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
        />
        <span style={{ color: 'red' }}>{this.state.error}</span>
      </>
    )
  }
}

const Courses = {
  depOne: [
    'Course #1',
    'Course #2',
    'Course #3',
  ],
  depTwo: [
    'Course #4',
    'Course #5',
    'Course #6',
  ]
}

class CourseSelect extends React.Component {

  state = {
    department: null,
    course: null,
    courses: []
  }

  static getDerivedStateFromProps(update) {
    return {
      department: update.department,
      course: update.course
    };
  }

  onSelectDepartment = (evt) => {
    const department = evt.target.value;
    const courses = department ? Courses[department] : null;
    const course = null;

    this.setState({
      department: department,
      courses: courses,
      // Reset course in state
      course: course
    });

    // Pass values to the form onInputChange
    this.props.onChange({ name: 'department', value: department });
  }

  renderDepartmentSelect = () => {
    return (
      <select
        onChange={this.onSelectDepartment}
        value={this.state.department || ''}
      >
        <option value=''>Which department?</option>
        <option value='depOne'>Department #1</option>
        <option value='depTwo'>Department #2</option>
      </select>
    );
  }

  onSelectCourse = (evt) => {
    const course = evt.target.value;
    this.setState({ course: course });
    // Pass values to the form onInputChange
    this.props.onChange({ name: 'course', value: course });
  }

  renderCourseSelect = () => {
    return (
      <select
        onChange={this.onSelectCourse}
        value={this.state.course || ''}
      >
        <option value='' key='none'>Which course?</option>
        {this.state.courses ? this.state.courses.map((course, i) => {
          return <option key={i} value={course}>{course}</option>;
        }) : false }
      </select>
    );
  }

  render() {
    return (
      <div>
        {this.renderDepartmentSelect()}
      <br/>
        {this.renderCourseSelect()}
      </div>
    );
  }
}
