import React, { Fragment } from "react";
import Hero from "./Hero";
import NewUser from "./NewUser";

const NewPatient = props => {
  return (
    <Fragment>
      <Hero title="Create New Patient" />
      <section className="section">
        <div className="container">
          <NewUser />
        </div>
      </section>
    </Fragment>
  );
};

export default NewPatient;
