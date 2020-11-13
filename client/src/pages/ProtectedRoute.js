import React from "react";
import Login from "./Login-Signup/login"
import api from "../utils/API";
import Loader from "react-loader-spinner";

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
    const { isAuthenticated } = this.state;
    if (isAuthenticated === undefined) return <div className="m-5 p-5 mx-auto w-25 text-center">
      <Loader className="m-5 p-5" type="Bars" color="#00eFFF44" height={200} width={200} />
    </div>;
    else if (isAuthenticated === false) return <Login />;
    else if (isAuthenticated === true) return <Component />;
    else return <span>An error occurred.</span>;
  }
}

export default ProtectedRoute;
