import React, { Fragment } from "react";
import { connect } from "react-redux";
import Hero from "../components/Hero";
import Message from "../components/Message";

const Patient = props => {
  const isPatient = props.user.role === "patient";
  return (
    <Fragment>
      <Hero title="Patient Portal" />
      {!(props.user.role === "patient") ? (
        <Message
          text=" You must be logged in as a patient to access the patient portal."
          type="warning"
        />
      ) : (
        <section className="section"></section>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { user: state.login.user };
};

export default connect(mapStateToProps)(Patient);
