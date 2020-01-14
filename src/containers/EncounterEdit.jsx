import React, { Fragment } from "react";
import { connect } from "react-redux";
import PatientBanner from "../components/PatientBanner";

class EncounterEdit extends React.Component {
  render() {
    return (
      <Fragment>
        <PatientBanner />
      </Fragment>
    );
  }
}

export default connect()(EncounterEdit);
