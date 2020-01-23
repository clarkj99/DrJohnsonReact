import React, { Fragment } from "react";
import { connect } from "react-redux";
import Hero from "../components/Hero";
import Message from "../components/Message";
import PatientList from "../components/PatientList";
import EncounterDetail from "../components/EncounterDetail";

const Patient = props => {
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
            <div className="column is-two-fifths">
              <PatientList />
            </div>
            <div className="column">
              {Object.getOwnPropertyNames(props.selectedEncounter).length !==
              0 ? (
                <EncounterDetail />
              ) : (
                <Message
                  text=" Select an encounter to view details."
                  type="warning"
                />
              )}
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
    encounters: state.encounter.encounters,
    selectedEncounter: state.encounter.selectedEncounter
  };
};

export default connect(mapStateToProps)(Patient);
