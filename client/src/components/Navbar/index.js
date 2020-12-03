import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from "../../images/logo-small.png";
import { FaRegTimesCircle, FaUserAlt } from 'react-icons/fa';
import { FaSearchLocation } from 'react-icons/fa';
import { FaSuitcaseRolling } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { FaPlane } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';

function Navbar() {
  return (
    <div>
      <header style={{ height: "6.5rem" }} className="fixed-top body-content border-bottom border-warning">
        <Link to="/">
          <img alt="logo" style={{ height: "3.5rem", width: "15rem" }} src={Logo} id="logo"></img>
        </Link>

        <Menu>
        <a className="menu-item" href="/">
            <FaHome />Home
          </a>
          <a className="menu-item" href="/my-flights">
            <FaPlane />My Flights
          </a>
          <a className="menu-item" href="/search-flights">
          <FaSearchLocation />Search Flights
          </a>
          <a className="menu-item" href="/trips">
          <FaSuitcaseRolling />Trips
          </a>
          <a className="menu-item" href="/invites">
          <FaUserFriends />Invites
          </a>
          <a className="menu-item" href="/profile">
          <FaUserAlt />Profile
          </a>
          <a className="menu-item" href="/logout">
          <FaRegTimesCircle />Logout
          </a>
        </Menu>
      </header>
    </div>
  );
}

export default Navbar;
