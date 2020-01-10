import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Hero title="DrJohnson - FlatIron's Premier EMR" />
            <Login />
          </Route>
          <Route exact path="/about">
            <Hero title="About DrJohnson" />
          </Route>
          <Route exact path="/features">
            <Hero title="EMR Features" />
          </Route>
          <Route exact path="/contact-us">
            <Hero title="Contact US" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
