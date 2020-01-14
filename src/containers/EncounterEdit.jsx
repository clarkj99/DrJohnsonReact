import React, { Fragment } from "react";
import { connect } from "react-redux";
import PatientBanner from "../components/PatientBanner";
import HPI from "../components/HPI";

class EncounterEdit extends React.Component {
  render() {
    return (
      <Fragment>
        <PatientBanner />
        <HPI />
      </Fragment>
    );
  }
}

export default connect()(EncounterEdit);
