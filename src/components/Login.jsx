import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addLogin } from "../actions/rootActions";
import Hero from "./Hero";
import DemoUsers from "./DemoUsers";
import { fetchFunction } from "../utils";

class Login extends React.Component {
  initalUser = {
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  };

  state = {
    loginUser: { ...this.initalUser }
  };

  handleLoginChange = e => {
    this.setState({
      loginUser: { ...this.state.loginUser, [e.target.name]: e.target.value }
    });
  };

  submitLogin = e => {
    e.preventDefault();

    fetchFunction("auth", "POST", {
      user: this.state.loginUser
    })
      .then(res => {
        localStorage.setItem("token", res.jwt);
        this.props.addLogin(res.user);
        // localStorage.setItem("user", JSON.stringify(res.user));
      })
      .catch(res => {
        this.setState({ loginError: res.message });
      });
  };

  render = () => {
    return (
      <Fragment>
        <Hero title="Login" />
        <DemoUsers />
        <section className="section">
          <div className="container">
            <h2 className="title">Login</h2>
            <p>
              Healthcare providers, enter your credentials to access patient
              care.
            </p>
            <form onSubmit={this.submitLogin}>
              <div className="field">
                <input
                  onChange={this.handleLoginChange}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="input"
                  value={this.state.loginUser.email}
                />
              </div>
              <div className="field">
                <input
                  onChange={this.handleLoginChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={this.state.loginUser.password}
                />
              </div>
              <div className="field">
                {this.state.loginError && (
                  <p className="help is-danger">{this.state.loginError}</p>
                )}
                <button
                  type="submit"
                  className="button is-fullwidth is-primary"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </section>
      </Fragment>
    );
  };
}

const mapDispatchToProps = {
  addLogin
};

export default connect(null, mapDispatchToProps)(Login);
