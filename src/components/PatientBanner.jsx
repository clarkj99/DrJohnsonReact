import React from "react";
import { connect } from "react-redux";
import {
  stopEncounter,
  setStep,
  selectEncounter
} from "../actions/rootActions";
import unknownUser from "../images/unknown-user2.png";
import { Link, withRouter } from "react-router-dom";
import Checkbox from "./Checkbox";
import { fetchFunction } from "../utils";
import Icon from "./Icon";

const handleClose = props => {
  props.setStep(1);
  props.history.push("/providers");
};

const handleToggle = props => {
  const status = props.encounter.status === "open" ? "closed" : "open";
  fetchFunction(`encounter/${props.encounter.id}`, "PATCH", {
    encounter: { status: status }
  }).then(data => {
    props.selectEncounter(data);
  });
};

const PatientBanner = props => {
  return (
    <section className="hero">
      <div className="hero-body box has-background-primary">
        <article className="media">
          <figure className="image avatar is-128x128 media-left">
            <img
              src={props.encounter.patient.profile.photo || unknownUser}
              alt={props.encounter.patient.last_name}
            ></img>
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
              <div className="column">
                <p>
                  <span className="has-text-weight-bold">Chief complaint:</span>{" "}
                  {props.encounter.intake.complaint}
                </p>
              </div>
              <div className="column">
                <p>
                  <span className="has-text-weight-bold">Provider:</span>{" "}
                  {props.encounter.provider.last_name},{" "}
                  {props.encounter.provider.first_name}
                </p>
              </div>
            </div>

            <nav className="navbar is-transparent">
              <div className="navbar-menu">
                <div className="navbar-start">
                  <div className="navbar-item">
                    <Link
                      to="/providers/patient-profile"
                      className="is-link button"
                    >
                      <Icon icon="address-card" />
                      {/* <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span> */}
                      <span>Profile</span>
                    </Link>
                  </div>
                  <div className="navbar-item">
                    <Link
                      className="is-link button"
                      to="/providers/patient-history"
                    >
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>History</span>
                    </Link>
                  </div>
                </div>
                <div className="navbar-end">
                  <div className="navbar-item">
                    <Checkbox
                      field="status"
                      label={
                        props.encounter.status === "open" ? "OPEN" : "SIGNED"
                      }
                      value={props.encounter.status === "open"}
                      size={"is-large"}
                      handleChange={() => handleToggle(props)}
                    />
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="media-right">
            <button
              className="delete is-large"
              onClick={() => handleClose(props)}
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

const mapDispatchToProps = { stopEncounter, setStep, selectEncounter };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PatientBanner));
