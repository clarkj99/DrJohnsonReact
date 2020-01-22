import React from 'react';
import './App.scss';
import { fetchFunction } from './utils'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Login from './components/Login';
import Home from './components/Home';
import Nomatch from './components/Nomatch';
import Profile from './components/Profile';
import Provider from './containers/Provider';
import PatientProfile from './components/PatientProfile';
import History from './components/History';
import EncounterEdit from "./containers/EncounterEdit";
import aws from './images/AWS-Cloud-alt_dark-bg@4x.png'

import { connect } from 'react-redux'
import { addLogin } from './actions/rootActions'
import Patient from './containers/Patient';
import NewPatient from './components/NewPatient';

class App extends React.Component {

  componentDidMount = () => {
    // If a token is present, then get the user profile
    if (localStorage.getItem('token')) {
      fetchFunction(`profile`, "GET")
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

            <Route path="/providers/newpatient">
              <NewPatient />
            </Route>
            <Route path="/providers/encounter">
              {Object.getOwnPropertyNames(this.props.selectedEncounter).length !== 0 ? <EncounterEdit /> : <Redirect to="/providers" />}
            </Route>
            <Route path="/providers/patient-profile">
              {this.props.selectedPatient ? <PatientProfile /> : <Redirect to="/providers" />}
            </Route>
            <Route path="/providers/patient-history">
              {this.props.selectedPatient ? <History /> : <Redirect to="/providers" />}
            </Route>
            <Route exact path="/providers">
              {this.props.user ? <Provider /> : <Login />}
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
        <footer class="footer has-background-primary">
          <div className="container">
            <article className="media">
              <figure className="media-left  image is-64x64">
                <img src={aws} als="powered by amazon S3" />
              </figure>
              <div className="media-content">
                <div class="content has-text-centered">

                  <p>
                    <strong>DrJohnson</strong> made with ❤️ by <a href="https://jgthms.com">Clark Johnson</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>

                </div>
              </div>
            </article>
          </div>

        </footer>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.login.user, selectedPatient: state.user.selectedPatient, selectedEncounter: state.encounter.selectedEncounter }
}

const mapDispatchToProps = { addLogin }

export default connect(mapStateToProps, mapDispatchToProps)(App);
