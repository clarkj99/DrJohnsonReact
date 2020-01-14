import React from "react";
import { connect } from "react-redux";
import { stopEncounter } from "../actions/rootActions";

const PatientBanner = props => {
  return (
    <section className="hero">
      <div className="hero-body box has-background-primary">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <p className="is-size-5 has-text-weight-bold">
                {props.encounter.patient.last_name},{" "}
                {props.encounter.patient.first_name}
              </p>
              <p>
                {props.encounter.patient.profile.address1} <br />
                {props.encounter.patient.profile.city},{" "}
                {props.encounter.patient.profile.state}{" "}
                {props.encounter.patient.profile.zip}
              </p>
            </div>
            <div className="column">
              <span className="has-text-weight-bold">Chief complaint:</span>{" "}
              {props.encounter.complaint}
            </div>
            <div className="column"></div>{" "}
            <button
              className="delete is-large"
              onClick={e => props.stopEncounter()}
            ></button>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return { encounter: state.encounter.selectedEncounter };
};

const mapDispatchToProps = { stopEncounter };

export default connect(mapStateToProps, mapDispatchToProps)(PatientBanner);
