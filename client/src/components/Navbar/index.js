import React from 'react';
import './style.css';
import Logo from '../../images/logo-small.png';

export const Navbar = () => (
  <header className="header clearfix">
    <a href="/"><img src={Logo} className='logo' alt="Logo" /></a>
    <input className="menu-btn" type="checkbox" id="menu-btn" />
    <label className="menu-icon"><span className="navicon"></span></label>
    <ul className="menu">
      <li><a href="/my-flights">My Flights</a></li>
      <li><a href="/search-flights">Search Flights</a></li>
      <li><a href="/trips">Trips</a></li>
      <li><a href="/messages">Messages</a></li>
      <li><a href="/profile">Profile</a></li>
    </ul>
  </header>
)
  
export default Navbar;