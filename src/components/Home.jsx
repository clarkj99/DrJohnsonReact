import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home-section section is-fullheight">
      <div className="container">
        {/* <div className="columns">
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
        </div> */}

        <div className="columns level">
          <div className="column">
            <div className="card">
              <div className="card-content has-text-centered">
                <span
                  className="title has-text-primary"
                  style={{ fontSize: "9em" }}
                >
                  <i className="fas fa-user-md"></i>
                </span>
              </div>
              <div className="card-content home-card-middle has-text-centered">
                <h2 className="title has-text-primary">Healthcare Providers</h2>
              </div>
              <footer className="card-footer">
                <div className="card-footer-item has-text-centered">
                  <Link to="/providers" className="button is-link is-large">
                    <span className="icon">
                      <i className="fas fa-arrow-alt-circle-right"></i>
                    </span>
                    <span>Go to Patient Care</span>
                  </Link>
                </div>
              </footer>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="card-content has-text-centered">
                <span
                  className="title has-text-primary"
                  style={{ fontSize: "9em" }}
                >
                  <i className="fas fa-user-injured"></i>
                </span>
              </div>
              <div className="card-content home-card-middle  has-text-centered">
                <h2 className="title has-text-primary">Patients</h2>
              </div>
              <footer className="card-footer">
                <div className="card-footer-item has-text-centered">
                  <Link to="/patients" className="button is-link is-large">
                    <span className="icon">
                      <i className="fas fa-arrow-alt-circle-right"></i>
                    </span>
                    <span> Go to Patient Portal</span>
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
