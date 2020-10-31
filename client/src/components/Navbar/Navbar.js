import React from 'react';
import "./style.css"
import Logo from '../../images/Logo.png'


export const Navbar = () => (

<div id="navbar">

    <div class="logo">
        <img src={Logo}></img>

        <div id="menuToggle">
    <nav role="navigation" id="nav">
  
        <input type="checkbox" />
        
        <span></span>
        <span></span>
        <span></span>
        
        <ul id="menu">
          <a href="/"><li>Home</li></a>
          <a href="/Trips"><li>Trips</li></a>
          <a href="/Messages"><li>Messages</li></a>
          <a href="/Profile"><li>Profile</li></a>
        </ul>
    </nav>
    </div>


    </div>



</div>

    )
  
    export default Navbar;