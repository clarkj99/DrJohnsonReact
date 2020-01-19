import React, { Fragment } from "react";
import Hero from "./Hero";
import NewUser from "./NewUser";

const NewPatient = props => {
  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <NewUser role="patient" />
        </div>
      </section>
    </Fragment>
  );
};

export default NewPatient;
