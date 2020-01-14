import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addLogin } from "../actions/rootActions";
import Hero from "./Hero";

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

    fetch("http://localhost:3000/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: this.state.loginUser
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response; //we only get here if there is no error
      })
      .then(res => res.json())
      .then(res => {
        this.props.addLogin(res.user);
        localStorage.setItem("token", res.jwt);
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
