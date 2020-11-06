import React from "react";
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';
import './style.css';
import axios from 'axios'
import Logo from "../../images/logo-small.png";



class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('sign-up-form, username');
    console.log(this.state.username);
    // request server here
    axios.post('/', {
      username: this.state.username,
      password: this.state.password
  })

      .then(response => {
        console.log(response)
        if (response.data) {
          console.log('successful signup')
          this.setState({
            redirectTo: '/login'
          })
        } else {
          console.log('Sign-up error');

        }
      }).catch(error => {
        console.log('Sign up server error: ')
        console.log(error);
        })
      }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="username">
          Password
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SignUp;
