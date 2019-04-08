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

  onInputChange = (evt) => {
    const fields = Object.assign({}, this.state.fields);
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields: fields });
  }

  validate = (person) => {
    const errors = {};
    if(!person.name) errors.name='Name is required.';
    if(!person.email) errors.email='Email is required.';
    if(person.email && !isEmail(person.email)) errors.email='Enter valid email.';
    return errors;
  }

  onFormSubmit = (evt) => {
    const people = [...this.state.people];
    const person = this.state.fields;

    // Validate fields
    const fieldErrors = this.validate(person);
    this.setState({ fieldErrors });
    evt.preventDefault();

    // Exit if fieldErrors
    if(Object.keys(fieldErrors).length) return;

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
          <input
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
          />
          <span style={{ color: 'red' }}>{this.state.fieldErrors.name}</span>
          <br/>
          <input
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />
          <span style={{ color: 'red' }}>{this.state.fieldErrors.email}</span>
          <br/>
          <input
            type='submit'
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
