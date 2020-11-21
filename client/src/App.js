import React from "react";
import Home from "./pages/Home";
import Flights from "./pages/My-Flights";
import Search from "./pages/Search-Flights";
import Friends from "./pages/Friends";
import Groups from "./pages/Groups";
import Trips from "./pages/Trips";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Login from "./pages/Login-Signup/login";
import Logout from "./pages/Logout";
import Signup from "./pages/Login-Signup/signUp";
import NoMatches from "./pages/NoMatches";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container fluid>
      <Router>
        <Navbar style={{ position: "sticky", top: 0, left: 0, right: 0 }} />
        <Switch>
          <ProtectedRoute exact path={["/", "/dashboard"]} component={Home} />
          <ProtectedRoute exact path="/search-flights" component={Search} />
          <ProtectedRoute exact path="/my-flights" component={Flights} />
          <ProtectedRoute exact path="/invites" component={Friends} />
          <ProtectedRoute exact path="/messages/:id?" component={Messages} />
          <ProtectedRoute exact path="/trips/:id?" component={Trips} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute component={NoMatches} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
