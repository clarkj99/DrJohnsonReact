import React from "react";
import { connect } from "react-redux";
import { stopEncounter } from "../actions/rootActions";

const PatientBanner = props => {
  return (
    <section className="hero">
      <div className="hero-body box has-background-primary">
        <article className="media">
          <figure className="media-left">
            <p className="avatar image is-128x128">
              <img src={props.encounter.patient.profile.photo}></img>
            </p>
          </figure>
          <div className="media-content">
            <div className="columns">
              <div className="column is-one-fifth">
                <p className="has-text-weight-bold">
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
              <div className="column is-four-fifths">
                <p>
                  <span className="has-text-weight-bold">Chief complaint:</span>{" "}
                  {props.encounter.complaint}
                </p>
              </div>
            </div>
          </div>
          <div className="media-right">
            <button
              className="delete is-large"
              onClick={e => props.stopEncounter()}
            ></button>
          </div>
        </article>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return { encounter: state.encounter.selectedEncounter };
};

const mapDispatchToProps = { stopEncounter };

export default connect(mapStateToProps, mapDispatchToProps)(PatientBanner);
