import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addLogin } from "../actions/rootActions";
import Hero from "./Hero";
import DemoUsers from "./DemoUsers";
import { fetchFunction } from "../utils";
import Message from "./Message";

class Login extends React.Component {
  initalUser = {
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  };

  state = {
    loginUser: { ...this.initalUser },
    error: ""
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
        this.props.history.push("/");
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  render = () => {
    const error =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.error;

    return (
      <Fragment>
        <Hero title="Login" />
        {/* <DemoUsers /> */}
        {error && <Message text={error} type="danger" />}
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
                {this.state.error && (
                  <p className="help is-danger">{this.state.error}</p>
                )}
                <button type="submit" className="button  ">
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

export default connect(null, mapDispatchToProps)(withRouter(Login));
