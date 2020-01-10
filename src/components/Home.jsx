import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="section">
      <div className="columns">
        <div className="column">
          <Link to="/providers" className="button is-link">
            Providers
          </Link>
        </div>
        <div className="column">
          <Link to="/patients" className="button is-link">
            Patients
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
