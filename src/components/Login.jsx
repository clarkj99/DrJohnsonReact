import React from "react";
import { connect } from "react-redux";
import { login } from "../actions/login";

class Login extends React.Component {
  initalUser = {
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  };

  state = {
    loginUser: { ...this.initalUser },
    signupUser: { ...this.initalUser }
  };

  handleLoginChange = e => {
    this.setState({
      loginUser: { ...this.state.loginUser, [e.target.name]: e.target.value }
    });
  };

  handleSignupChange = e => {
    this.setState({
      signupUser: { ...this.state.signupUser, [e.target.name]: e.target.value }
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
        this.props.login(res.user);
        localStorage.setItem("token", res.jwt);
        // localStorage.setItem("user", JSON.stringify(res.user));
      })
      .catch(res => {
        this.setState({ loginError: res.message });
      });
  };

  submitSignup = e => {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: this.state.signupUser
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
        this.props.login(res.user);
        localStorage.setItem("token", res.jwt);
        // localStorage.setItem("user", JSON.stringify(res.user));
      })
      .catch(res => {
        this.setState({ signupError: res.message });
      });
  };

  render = () => {
    return (
      <section className="section">
        <div className="columns">
          <div className="login-column column content">
            <h2 className="title">Sign In</h2>
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
          <div className="is-divider-vertical"></div>
          <div className="login-column column content">
            <h2 className="title">Sign Up</h2>
            <p>New to DrJohnson? Get started!</p>
            <form onSubmit={this.submitSignup}>
              <div className="field">
                <div className="control">
                  <input
                    onChange={this.handleSignupChange}
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    className="input"
                    value={this.state.signupUser.first_name}
                  />
                </div>
              </div>
              <div className="field">
                <input
                  onChange={this.handleSignupChange}
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  className="input"
                  value={this.state.signupUser.last_name}
                />
              </div>
              <div className="field">
                <input
                  onChange={this.handleSignupChange}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="input"
                  value={this.state.signupUser.email}
                />
              </div>
              <div className="field">
                <input
                  onChange={this.handleSignupChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={this.state.signupUser.password}
                />
              </div>
              <div className="field">
                {this.state.signupError && (
                  <p className="help is-danger">{this.state.signupError}</p>
                )}
                <button
                  type="submit"
                  className="button is-fullwidth is-primary"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  };
}

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(Login);
