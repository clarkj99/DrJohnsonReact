import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchFunction } from "../utils";
import {
  addLogin,
  selectPatient,
  addPatientToList,
  setCreatingPatient
} from "../actions/rootActions";

class NewUser extends React.Component {
  initalUser = {
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  };

  state = {
    signupUser: { ...this.initalUser }
  };

  handleSignupChange = e => {
    this.setState({
      signupUser: { ...this.state.signupUser, [e.target.name]: e.target.value }
    });
  };

  handleCancel = () => {
    this.props.setCreatingPatient(false);
  };

  submitSignup = e => {
    e.preventDefault();

    // fetch("http://localhost:3000/api/v1/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`
    //   },
    //   body: JSON.stringify({
    //     user: this.state.signupUser
    //   })
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw Error(response.statusText);
    //     }
    //     return response; //we only get here if there is no error
    //   })
    //   .then(res => res.json())
    fetchFunction("users", "POST", {
      user: this.state.signupUser
    })
      .then(res => {
        console.log("new user done");
        // this.props.addLogin(res.user);
        this.props.selectPatient(res.user);
        this.props.addPatientToList(res.user);
        this.props.setCreatingPatient(false);
        this.setState({ signupError: "", signupUser: { ...this.initalUser } });
        // localStorage.setItem("token", res.jwt);
        // localStorage.setItem("user", JSON.stringify(res.user));
      })
      .catch(res => {
        this.setState({ signupError: res.message });
      });
  };

  render() {
    return (
      <Fragment>
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
            <div className="buttons">
              <button type="submit" className="button is-link">
                <span className="icon">
                  <i className="fas fa-plus-square"></i>
                </span>
                <span>Create {this.props.role}</span>
              </button>
              <button
                type="reset"
                className="button is-link"
                onClick={this.handleCancel}
              >
                <span className="icon">
                  <i className="fas fa-ban"></i>
                </span>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.login.user };
};

const mapDispatchToProps = {
  addLogin,
  selectPatient,
  addPatientToList,
  setCreatingPatient
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
