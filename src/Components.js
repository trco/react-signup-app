import React from 'react';

import isEmail from 'validator/lib/isEmail';

class SignUpForm extends React.Component {

  state = {
    people: [],
    fields : {
      name: '',
      email: ''
    },
    fieldErrors: {}
  }

  onInputChange = ({ name, value, error }) => {
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  }

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    // Check keys in fieldErrors & construct new array if key has value
    const errMessages = Object.keys(fieldErrors).filter((key) => fieldErrors[key]);

    if (!person.name) return true;
    if (!person.email) return true;
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
        email: ''
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
          <input
            type='submit' disabled={this.validate()}
          />
        </form>

        <ul>
          <h3>Participants</h3>
          {this.state.people.map(({name, email}, i) => {
            return <li key={i}>{name} {email}</li>;
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
    this.props.onChange({ name, value, error })
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
