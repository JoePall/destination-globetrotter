import React from "react";
import Login from "./Login-Signup/login"
import api from "../utils/API";

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    const isAuthenticated = true; // TODO: api.users.authenticated()

    return isAuthenticated ? (
      <Component />
    ) : (
      <Login />
    );
  }
}

export default ProtectedRoute;
