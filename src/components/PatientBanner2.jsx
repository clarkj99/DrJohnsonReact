import React from "react";
import { connect } from "react-redux";
import unknownUser from "../images/unknown-user2.png";

const PatientBanner2 = props => {
  return (
    <article className="media">
      <figure className="image avatar-small is-64x64 media-left">
        <img
          src={props.patient.profile.photo || unknownUser}
          alt={props.patient.last_name}
        ></img>
      </figure>
      <div className="media-content">
        <div className="field">
          <p className="has-text-weight-bold">
            {props.patient.last_name}, {props.patient.first_name}
          </p>
          <p>
            {props.patient.profile.address1} <br />
            {props.patient.profile.city}, {props.patient.profile.state}{" "}
            {props.patient.profile.zip}
          </p>
        </div>
      </div>
    </article>
  );
};

const mapStateToProps = state => {
  return { patient: state.user.selectedPatient };
};

export default connect(mapStateToProps)(PatientBanner2);
