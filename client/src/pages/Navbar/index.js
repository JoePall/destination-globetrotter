import React from 'react';
import './style.css';
import Logo from '../../images/logo-small.png'



export const Navbar = () => (

  <div id="main">

      <header class="header">
      <img src={Logo} class='logo'></img>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
      <ul class="menu">
        <li><a href="#">Search Flights</a></li>
        <li><a href="#">Trips</a></li>
        <li><a href="#">Messages</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </header>

</div>
)
  
    export default Navbar;