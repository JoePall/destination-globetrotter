import React, { useState, useEffect } from "react";
import "./style.css";
import Logo from "../../images/logo-small.png";
import { Link } from "react-router-dom";
import api from "../../utils/API";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    
    this.loaded = false; 
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loaded = true;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.loaded) return;
    console.log('Form submitted: ' + JSON.stringify(this.state));
    
    api.users.login(this.state)
    .then(() => window.location.assign("/"))
    .catch(err => console.log("ERROR: " + err.responseJSON));
  }

  handleInputChange({ target }) {
    this.setState({
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="m-5 p-5 card mx-auto w-75">
        <label className="rounded-pill mx-auto btn btn-light px-2">
          email:
          <input
            name="email"
            type="email"
            className="rounded-pill px-3 ml-3"
            value={this.state.email}
            onChange={this.handleInputChange} />
        </label>
        <label className="rounded-pill mx-auto btn btn-light px-2">
          password:
          <input
            name="password"
            type="password"
            className="rounded-pill px-3 ml-3"
            value={this.state.password}
            onChange={this.handleInputChange} />
        </label>
        <button onClick={this.handleSubmit} className="rounded-pill mx-auto btn btn-primary px-4">SUBMIT</button>
      </form>
    );
  }
}

{/* <form action="/api/login" method="post">
<input type="text" id="login" className="fadeIn second" name="email" placeholder="email"></input>
<input type="text" id="password" className="fadeIn third" name="login" placeholder="password"></input>
<input type="submit" className="fadeIn fourth" value="Log In"></input>
</form> */}

export default Login;
