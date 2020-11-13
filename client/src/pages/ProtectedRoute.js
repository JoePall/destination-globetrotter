import React from "react";
import Login from "./Login-Signup/Login"
import api from "../utils/API";

class ProtectedRoute extends React.Component {
  constructor () {
    super();

    this.state = { isAuthenticated: [] };
  }
  
  componentDidMount() {
    api.User.isAuthenticated().then(res => {
      console.log(res);
      this.setState({ isAuthenticated: res.data });
    });
  }

  render() {
    const Component = this.props.component;
    const { isAuthenticated } = this.state
    return isAuthenticated ? (isAuthenticated) ? <Component /> : <Login /> : (
      <span>Loading...</span>
    )
  }
}

export default ProtectedRoute;
