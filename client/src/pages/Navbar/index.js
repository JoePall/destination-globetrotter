import React from 'react';
import './style.css';
import Logo from '../../images/logo-small.png'



export const Navbar = () => (

  <div id="main">
      <header className="header">
      <img src={Logo} className='logo' alt="Logo"></img>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon"><span className="navicon"></span></label>
      <ul className="menu">
        <li><a href="SearchBar">Search Flights</a> </li>
        <li><a href="/">Trips</a></li>
        <li><a href="/">Messages</a></li>
        <li><a href="/">Profile</a></li>
      </ul>
    </header>

</div>
)
  
    export default Navbar;