import React, { Fragment } from "react";

const Login = props => {
  return (
    <section className="section">
      <div className="columns">
        <div className="login-column column content">
          <h2 className="title">Sign In</h2>
          <p>
            Healthcare providers, enter your credentials to access patient care.
          </p>
          <form>
            <div className="field">
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="input"
              />
            </div>
            <div className="field">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input"
              />
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-primary">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div class="is-divider-vertical"></div>
        <div className="login-column column content">
          <h2 className="title">Sign Up</h2>
          <p>New to DrJohnson? Get started!</p>
          <form>
            <div className="field">
              <div className="control">
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <input
                name="last_name"
                type="text"
                placeholder="Last Name"
                className="input"
              />
            </div>
            <div className="field">
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="input"
              />
            </div>
            <div className="field">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input"
              />
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
