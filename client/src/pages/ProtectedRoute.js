import React from "react";
import Login from "./Login/login";
import api from "../utils/API";
import Loading from "../components/Loading";
import Error from "./Error";


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
        <Error />
      );
    else if (isAuthenticated === undefined)
      return <Loading />
    else if (isAuthenticated === false) return <Login />;
    else if (isAuthenticated === true) return <Component id={this.state.id} />;
    else return <Error />;
  }
}

export default ProtectedRoute;
