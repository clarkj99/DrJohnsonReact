import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import EncounterList from "../components/EncounterList";
import Search from "../components/Search";

const EncounterSelection = () => {
  return (
    <Fragment>
      <Hero title="Provider Access" />
      <section className="section">
        <div className="columns">
          <div className="column is-one-fifth">
            <h2 className="title">Add A New Patient</h2>
            <Link to="/providers/newpatient" className="button is-link ">
              New Patient
            </Link>
          </div>
          <div className="is-divider-vertical"></div>
          <div className="column">
            <Search />
          </div>

          <div className="is-divider-vertical"></div>

          <div className="column">
            <EncounterList />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default EncounterSelection;
