import React from "react";
import Login from "./Login-Signup/Login"
import api from "../utils/API";

class ProtectedRoute extends React.Component {
  render() {

    const Component = this.props.component;
    const isAuthenticated = api.User.isAuthenticated();

    return isAuthenticated ? (
      <Component />
    ) : (
      <Login />
    );
  }
}

export default ProtectedRoute;
