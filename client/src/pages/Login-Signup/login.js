import React, { useState, useEffect } from "react";
import "./style.css";
import Logo from "../../images/logo-small.png";
import { Link } from "react-router-dom";
import api from "../../utils/API";

function Login() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    login();
  }, [user]);

  function login() {
    api.users.login()
  }

  return (

    <div className="wrapper fadeInDown">
      <div id="formContent">
        <Link id="link" to="/login">
          <button id="button1">Login </button>
        </Link>
        <Link id="link" to="/signUp">
          <button id="button1">Sign Up </button>
        </Link>

        <div className="fadeIn first">
          <img src={Logo} id="icon" alt="User Icon"></img>
        </div>

        <form action="/api/login" method="post">
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="email"
            placeholder="email"
          ></input>
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
          ></input>
          <input type="submit" class="fadeIn fourth" value="Log In"></input>
        </form>
      </div>
    </div>
  );
}

    <form action="/api/login" method="post">
      <input type="text" id="login" className="fadeIn second" name="email" placeholder="email"></input>
      <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"></input>
      <input type="submit" className="fadeIn fourth" value="Log In"></input>
    </form>

export default Login;
