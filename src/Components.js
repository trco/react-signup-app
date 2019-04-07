import React from 'react';

class SignUpForm extends React.Component {

  state = {
    names: []
  }

  onFormSubmit = (evt) => {
    // Get value from input field
    const name = this.refs.name.value;
    // Construct new names
    const names = [...this.state.names, name];
    // Update state
    this.setState({ names: names });
    // Clear input field
    this.refs.name.value = '';
    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Sign Up App</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref='name'
          />
          <input
            type='submit'
          />
        </form>

        <ul>
          <h3>Participants</h3>
          {this.state.names.map((name) => {
            return <li>{name}</li>;
          })}
        </ul>
      </div>
    )
  }
}


export default SignUpForm;
