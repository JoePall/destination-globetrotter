import React from "react";
import "./style.css";
import Logo from "../../images/logo-small.png";

<div class="wrapper fadeInDown">
  <div id="formContent">
    <h2 class="active"> Sign In </h2>
    <h2 class="inactive underlineHover">Sign Up </h2>

    <div class="fadeIn first">
      <img src={Logo} id="icon" alt="User Icon" />
    </div>

    <form method="post">
      <input
        type="text"
        id="login"
        class="fadeIn second"
        name="email"
        placeholder="email"
      ></input>
      <input
        type="password"
        id="password"
        class="fadeIn third"
        name="password"
        placeholder="password"
      ></input>
      <input type="submit" class="fadeIn fourth" value="Log In"></input>
    </form>

    <div id="formFooter">
      <a class="underlineHover" href="#forgot-password">
        Forgot Password?
      </a>
    </div>
  </div>
</div>;
