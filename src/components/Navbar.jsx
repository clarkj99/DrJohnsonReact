import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/DrJohnson-white.png";
import { connect } from "react-redux";
import { logout } from "../actions/login";

const Navbar = props => {
  const handleClick = e => {
    localStorage.removeItem("token");
    props.logout();
  };

  let user = props.user;
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
            <Fragment>
              <div className="navbar-item">
                <NavLink className="button is-small" to="/profile">
                  {user.first_name} {user.last_name}
                </NavLink>
              </div>
              <div className="navbar-item">
                <button className="button is-small" onClick={handleClick}>
                  Logout
                </button>
              </div>
            </Fragment>
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

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
