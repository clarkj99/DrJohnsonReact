import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/DrJohnson-white.png";

const Navbar = props => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <img src={Logo} alt="DrJohnson" />
        </NavLink>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/">
            Home
          </NavLink>
          <NavLink className="navbar-item" to="/about">
            About
          </NavLink>
          <NavLink className="navbar-item" to="/features">
            Features
          </NavLink>
        </div>
        <div className="navbar-end">
          <NavLink className="navbar-item" to="/contact-us">
            Contact Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
