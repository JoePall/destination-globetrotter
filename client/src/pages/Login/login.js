import React from "react";
import "./style.css";
import Logo from "../../images/logo-small.png";
import api from "../../utils/API";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class Login extends React.Component {
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

    api.user
      .login(this.state)
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        if (location.pathname === "/login") {
          window.history.pushState(null, "Welcome", "/");
        } else {
          location.reload();
        }
      })
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
          <div className="row mx-auto my-2">
            <ButtonGroup
              size="large"
              className="mx-auto my-2"
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button width={1} disabled href="/">
                Login
              </Button>
              <Button width={1} href="/signup">
                Signup
              </Button>
            </ButtonGroup>
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
              autoFocus
              onClick={this.handleSubmit}
              className="btn btn-success my-4 w-75 mx-auto btn-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
