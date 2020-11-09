import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import './style.css';
import Logo from '../../images/logo-small.png';
 
class Navbar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
 
  render () {
    return (

    <div>
      <header>
        <img alt="logo" src={Logo} id='logo'></img>

        <Menu>
          <a className="menu-item" href="/my-flights">My-Flights</a>
          <a  className="menu-item" href="/search-flights">Search Flights</a>
          <a  className="menu-item" href="/trips">Trips</a>
          <a className="menu-item" href="/messages">Messages</a>
          <a className="menu-item" href="/profile">Profile</a>
        </Menu>

        </header>
    </div>
    );
  }
}
  
export default Navbar;