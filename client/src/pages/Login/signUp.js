import React from "react";
import "./style.css";
import Logo from "../../images/logo-small.png";
import api from "../../utils/API";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

    api.user
      .signup(this.state)
      .then(window.location.assign("/"))
      .catch(console.log);
  }

  handleInputChange({ target }) {
    this.setState({
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  }

  render() {
    return (
      <div className="wrapper my-5 p-5">
        <div id="formContent" className="container px-3">
        <div className="row mx-auto w-100 my-2 btn-group btn-group-lg" role="group" aria-label="...">
            <a
              href="/login"
              type="button"
              className="btn btn-outline-dark my-2 btn-lg"
              >
              login
            </a>
            <a
              aria-disabled
              href="/signup"
              type="button"
              className="btn btn-outline-dark disabled my-2 btn-lg"
            >
              signup
            </a>
          </div>

          <div className="row mx-auto my-2">
            <img src={Logo} className="mx-auto" id="icon" alt="User Icon"></img>
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              className="mx-auto"
              onInput={this.handleInputChange}
              name="firstName"
            />
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
              className="mx-auto"
              onInput={this.handleInputChange}
            />
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              className="mx-auto"
              onInput={this.handleInputChange}
            />
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className="mx-auto"
              onInput={this.handleInputChange}
            />
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <button
              onClick={this.handleSubmit}
              className="btn btn-primary mt-4 mb-2 w-100 mx-auto btn-lg"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
