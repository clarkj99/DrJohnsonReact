import React, { Fragment } from "react";
import { connect } from "react-redux";
import EncounterSelection from "./EncounterSelection";
import EncounterEdit from "./EncounterEdit";
import Hero from "../components/Hero";
import Message from "../components/Message";

const Provider = props => {
  return (
    <Fragment>
      {props.user.role === "patient" ? (
        <Fragment>
          <Hero title="Healthcare Providers" />
          <Message
            text=" You must be logged in as a healthcare provider to access patient care."
            type="warning"
          />
        </Fragment>
      ) : (
        <Fragment>
          {this.props.editingEncounter ? (
            <EncounterEdit />
          ) : (
            <EncounterSelection />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    editingEncounter: state.encounter.editingEncounter,
    user: state.login.user
  };
};

export default connect(mapStateToProps)(Provider);
