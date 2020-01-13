import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered has-text-primary has-background-link">
              <div>
                <span className="" style={{ fontSize: "6em" }}>
                  <i className="fas fa-user-md"></i>
                </span>
              </div>
              <h2 className="title has-text-primary">Healthcare Providers</h2>
              <Link to="/providers" className="button is-dark is-large">
                Go to Patient Care
              </Link>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered has-text-primary has-background-link">
              <div>
                <span style={{ fontSize: "6em" }}>
                  <i className="fas fa-user-injured"></i>
                </span>
              </div>
              <h2 className="title has-text-primary">Patients</h2>
              <Link to="/patients" className="button is-dark is-large">
                Go to Patient Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
