import React from "react";

const Navbar = props => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Bulma"
          />
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <a className="navbar-item">About</a>

          <a className="navbar-item">Features</a>
        </div>
        <div className="navbar-end">
          <a className="navbar-item">Contact Us</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
