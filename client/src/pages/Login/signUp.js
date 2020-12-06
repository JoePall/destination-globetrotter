import React from "react";
import "./style.css";
import Logo from "../../images/logo-small.png";
import api from "../../utils/API";

class Signup extends React.Component {
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
    
    console.log("Hello");

    api.user.signup(this.state)
      .then(window.location.assign("/"))
      .catch(console.log);
  }

  handleInputChange({ target }) {
    this.setState({
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    });
  }
  
  render() {
    return (
      <div className="wrapper my-5 p-5">
        <div id="formContent" className="container px-3">
          <div className="row mx-auto my-2">
            <a href="/login" className="col-5 mx-auto btn btn-outline-success my-4 btn-lg m-1">login</a>
            <a href="/signup" className="col-5 mx-auto btn btn-outline-dark disabled my-4 btn-lg m-1">signup</a>
          </div>

          <div className="row mx-auto my-2">
            <img src={Logo} className="mx-auto" id="icon" alt="User Icon"></img>
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <input type="text" className="mx-auto" onInput={this.handleInputChange} name="firstName" placeholder="first name" />
          </div>          
          <div className="row mx-auto my-2 fadeIn">
            <input type="text" className="mx-auto" onInput={this.handleInputChange} name="lastName" placeholder="last name" />
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <input type="email" className="mx-auto" onInput={this.handleInputChange} name="email" placeholder="email" />
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <input type="password" className="mx-auto" onInput={this.handleInputChange} name="password" placeholder="password" />
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <button onClick={this.handleSubmit} className="btn btn-primary my-4 w-75 mx-auto btn-lg">Signup</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;