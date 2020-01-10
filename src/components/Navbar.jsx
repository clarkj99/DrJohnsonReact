import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/DrJohnson-white.png";

const Navbar = props => {
  let user = JSON.parse(localStorage.getItem("user"));
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
          {user && (
            <div className="navbar-item">
              {user.first_name} {user.last_name}
            </div>
          )}
          <div className="navbar-item">
            <NavLink className="button is-small is-link" to="/contact-us">
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
