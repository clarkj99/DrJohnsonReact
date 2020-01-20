import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './components/Login';
import Home from './components/Home';
import Nomatch from './components/Nomatch';
import Profile from './components/Profile';
import Provider from './containers/Provider';

import { connect } from 'react-redux'
import { addLogin } from './actions/rootActions'
import Patient from './containers/Patient';
import NewPatient from './components/NewPatient';

class App extends React.Component {

  componentDidMount = () => {
    // If a token is present, then get the user profile
    if (localStorage.getItem('token')) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response; //we only get here if there is no error
        })
        .then(res => res.json())
        .then(data => {
          this.props.addLogin(data)
        })
        .catch(res => {
          // remove the token if user not found
          // localStorage.removeItem("token")
        });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Hero title="FlatIron's Premier EMR" />
              <Home />
            </Route>
            <Route path="/about">
              <Hero title="About DrJohnson" />
            </Route>
            <Route path="/features">
              <Hero title="EMR Features" />
            </Route>
            <Route path="/contact-us">
              <Hero title="Contact Us" />
            </Route>
            <Route path="/login">
              {this.props.user ? <Profile /> : <Login />}
            </Route>
            <Route exact path="/providers">
              {this.props.user ? <Provider /> : <Login />}
            </Route>
            <Route path="/providers/newpatient">
              <NewPatient />
            </Route>
            <Route path="/patients">
              {this.props.user ? <Patient /> : <Login />}
            </Route>
            <Route path="/profile">
              {this.props.user ? <Profile /> : <Login />}
            </Route>
            <Route path="*">
              <Nomatch />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.login.user }
}

const mapDispatchToProps = { addLogin }

export default connect(mapStateToProps, mapDispatchToProps)(App);
