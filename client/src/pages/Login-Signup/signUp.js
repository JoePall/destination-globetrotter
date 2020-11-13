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

    api.User.signup(this.state)
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
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="container mx-auto row">
            <a href="/login" className="col-5 mx-auto btn btn-white my-4 btn-lg m-1">login</a>
            <a href="/signup" className="col-5 mx-auto btn btn-outline-dark my-4 btn-lg m-1">signup</a>
          </div>

          <div className="fadeIn first">
            <img src={Logo} id="icon" alt="User Icon"></img>
          </div>

          <form action="/api/login" method="post">
            <input type="email" id="login" className="fadeIn second" name="email" placeholder="email"></input>
            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password"></input>
            <input type="submit" className="fadeIn fourth" value="Sign Up"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;