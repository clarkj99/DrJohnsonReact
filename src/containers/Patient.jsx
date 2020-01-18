import React, { Fragment } from "react";
import { connect } from "react-redux";
import Hero from "../components/Hero";
import Message from "../components/Message";
import PatientList from "../components/PatientList";
import EncounterDetail from "../components/EncounterDetail";

const Patient = props => {
  const isPatient = props.user.role === "patient";
  return (
    <Fragment>
      {!(props.user.role === "patient") ? (
        <Fragment>
          <Hero title="Patient Portal" />
          <Message
            text=" You must be logged in as a patient to access the patient portal."
            type="warning"
          />
        </Fragment>
      ) : (
        <section className="section">
          <div className="columns">
            <div className="column">
              <PatientList />
            </div>
            <div className="column">
              <EncounterDetail />
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.login.user,
    encounters: state.encounter.encounters
  };
};

export default connect(mapStateToProps)(Patient);
