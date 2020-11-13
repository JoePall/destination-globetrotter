import React from "react";
import Login from "./Login-Signup/Login"
import api from "../utils/API";

class ProtectedRoute extends React.Component {
  constructor () {
    super();

    this.state = { isAuthenticated: undefined };
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
    if (isAuthenticated === undefined) return <span>Loading...</span>
    else if (isAuthenticated === false) return <Login />;
    else if (isAuthenticated === true) return <Component />;
    else return <span>An error occurred.</span>;
  }
}

export default ProtectedRoute;
