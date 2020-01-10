import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = props => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Bulma"
          />
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
