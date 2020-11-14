import React from "react";
import Home from "./pages/Home";
import Flights from "./pages/My-Flights";
import Search from "./pages/Search-Flights";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Login from "./pages/Login-Signup/login";
import Logout from "./pages/Logout";
import Signup from "./pages/Login-Signup/signUp";
import NoMatches from "./pages/NoMatches";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <ProtectedRoute exact path={["/", "/dashboard"]} component={Home} />
        <ProtectedRoute exact path="/search-flights" component={Search} />
        <ProtectedRoute exact path="/my-flights" component={Flights} />
        <ProtectedRoute exact path="/messages" component={Messages} />
        <ProtectedRoute exact path="/trips" component={Groups} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute component={NoMatches} />
      </Switch>
    </Router>
  );
}

export default App;
