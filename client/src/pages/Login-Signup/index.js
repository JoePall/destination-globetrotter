import React from "react";
import "./style.css";
import Logo from "../../images/logo-small.png";

<div className="wrapper fadeInDown">
  <div id="formContent">
    <h2 className="active">Sign In </h2>
    <h2 className="inactive underlineHover">Sign Up </h2>

    <div className="fadeIn first">
      <img src={Logo} id="icon" alt="User Icon" />
    </div>

    <form method="post">
      <input
        type="text"
        id="login"
        className="fadeIn second"
        name="email"
        placeholder="email"
      ></input>
      <input
        type="password"
        id="password"
        className="fadeIn third"
        name="password"
        placeholder="password"
      ></input>
      <input type="submit" className="fadeIn fourth" value="Log In"></input>
    </form>

    <div id="formFooter">
      <a className="underlineHover" href="#forgot-password">
        Forgot Password?
      </a>
    </div>
  </div>
</div>;
