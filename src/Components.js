import React from 'react';

class SignUpForm extends React.Component {

  state = {
    people: [],
    fields : {
      name: '',
      email: ''
    }
  }

  onInputChange = (evt) => {
    const fields = Object.assign({}, this.state.fields);
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields: fields });
  }

  onFormSubmit = (evt) => {
    const people = [...this.state.people, this.state.fields];
    this.setState({ people: people, fields: { name: '', email: ''} });
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
          <input
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />
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
