import React from "react";
import './style.css';
import Logo from "../../images/logo-small.png";



export const SignUp = () => (

<div class="wrapper fadeInDown">
  <div id="formContent">
    <h2 class="active"> Sign In </h2>
    <h2 class="inactive underlineHover">Sign Up </h2>

    <div class="fadeIn first">
      <img src={Logo} id="icon" alt="User Icon"></img>
    </div>

    <form action="/api/login" method="post">
      <input type="text" id="login" class="fadeIn second" name="email" placeholder="email"></input>
      <input type="text" id="password" class="fadeIn third" name="login" placeholder="password"></input>
      <input type="submit" class="fadeIn fourth" value="Log In"></input>
    </form>

  </div>
</div>
);

export default SignUp;
