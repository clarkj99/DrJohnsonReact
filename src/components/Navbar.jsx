import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/DrJohnson-white.png";
import { connect } from "react-redux";
import {
  logout,
  resetEncounter,
  resetStep,
  resetUser
} from "../actions/rootActions";
import Icon from "./Icon";

class Navbar extends React.Component {
  state = { burgerMenuActive: false };

  handleClick = e => {
    localStorage.removeItem("token");
    this.props.logout();
    this.props.resetEncounter();
    this.props.resetStep();
    this.props.resetUser();
  };

  handleMenuToggle = e => {
    this.setState({ burgerMenuActive: !this.state.burgerMenuActive });
  };

  render() {
    const user = this.props.user;
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

          <a
            onClick={this.handleMenuToggle}
            className={
              "navbar-burger burger " +
              (this.state.burgerMenuActive && "is-active")
            }
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          className={
            "navbar-menu " + (this.state.burgerMenuActive && "is-active")
          }
        >
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/">
              <Icon icon="home" />
              <span> Home</span>
            </NavLink>
            <NavLink className="navbar-item" to="/contact-me">
              <Icon icon="phone" />
              <span>Contact Me</span>
            </NavLink>
          </div>
          <div className="navbar-end">
            {user ? (
              <Fragment>
                <div className="navbar-item">
                  <NavLink className="button is-small" to="/profile">
                    <Icon icon="address-card" />
                    <span>
                      {user.first_name} {user.last_name}
                    </span>
                  </NavLink>
                </div>

                {user.role === "admin" && (
                  <div className="navbar-item">
                    <NavLink className="button is-small" to="/admin">
                      <Icon icon="cog" />
                      <span>Admin</span>
                    </NavLink>
                  </div>
                )}

                <div className="navbar-item">
                  <button
                    className="button is-small"
                    onClick={this.handleClick}
                  >
                    <Icon icon="sign-out-alt" />
                    <span>Logout</span>
                  </button>
                </div>
              </Fragment>
            ) : (
              <div className="navbar-item">
                <NavLink className="button is-small" to="/login">
                  <Icon icon="sign-in-alt" />
                  <span> Login</span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.login.user };
}

const mapDispatchToProps = { logout, resetEncounter, resetUser, resetStep };
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
