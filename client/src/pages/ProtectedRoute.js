import React from "react";
import Login from "./Login-Signup/login";
import Alert from "react-bootstrap/Alert";
import api from "../utils/API";
import Loading from "../components/Loading";

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isAuthenticated: undefined, error: undefined };
  }

  componentDidMount() {
    this.state.id = this.props.computedMatch.params.id;

    api.user
      .isAuthenticated()
      .then((res) => {
        this.setState({ isAuthenticated: res.data });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    const Component = this.props.component;
    const { isAuthenticated, error } = this.state;
    if (error)
      return (
        <Alert className="mx-auto col-8 alert alert-danger text-center">
          <h2>Sorry!</h2>
          <hr />
          <h4>
            This is embarrassing ... and ... our app isn't working right now.
          </h4>
        </Alert>
      );
    else if (isAuthenticated === undefined)
      return <Loading />
    else if (isAuthenticated === false) return <Login />;
    else if (isAuthenticated === true) return <Component id={this.state.id} />;
    else return <Alert className="mx-auto col-8 alert alert-danger text-center">
    <h2>Sorry!</h2>
    <hr />
    <h4>
      This is embarrassing ... and ... our app isn't working right now.
    </h4>
  </Alert>;
  }
}

export default ProtectedRoute;
