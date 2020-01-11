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
import { login } from './actions/rootActions'

class App extends React.Component {

  componentDidMount = () => {
    // If a token is present, then get the user profile
    if (localStorage.getItem('token')) {
      console.log('fetching user');
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
          this.props.login(data.user)
        })
        .catch(res => {
          // remove the token if user not found
          localStorage.removeItem("token")
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
              <Hero title="DrJohnson - FlatIron's Premier EMR" />
              <Home />
            </Route>
            <Route path="/about">
              <Hero title="About DrJohnson" />
            </Route>
            <Route path="/features">
              <Hero title="EMR Features" />
            </Route>
            <Route path="/contact-us">
              <Hero title="Contact US" />
            </Route>
            <Route path="/login">
              <Hero title="Login" />
              <Login />
            </Route>
            <Route path="/provider">
              <Hero title="Provider Access" />
              {this.props.user ? <Provider /> : <Login />}

            </Route>
            <Route path="/patient">
              <Hero title="Patient Portal" />
            </Route>
            <Route path="/profile">
              <Profile />
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

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(App);
