import React from "react";
import Home from "./pages/Home";
import Flights from "./pages/My-Flights";
import Search from "./pages/Search-Flights";
import Trips from "./pages/Trips";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Login from "./pages/Login-Signup/login";
import NoMatches from "./pages/NoMatches";
import Navbar from "./components/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Login />
      <Switch>
        <Route exact path={["/", "/dashboard"]} component={Home} />
        <Route exact path="/my-flights" component={Flights} />
        <Route exact path="/search-flights" component={Search} />
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/trips" component={Trips} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route component={NoMatches} />
      </Switch>
    </Router>
  );
}

export default App;
