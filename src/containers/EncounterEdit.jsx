import React, { Fragment } from "react";
import { connect } from "react-redux";
import PatientBanner from "../components/PatientBanner";
import HPI from "../components/HPI";
import RoSystems from "../components/RoSystems";
import ProblemExam from "../components/ProblemExam";

class EncounterEdit extends React.Component {
  render() {
    return (
      <Fragment>
        <PatientBanner />
        <HPI />
        <RoSystems />
        <ProblemExam />
      </Fragment>
    );
  }
}

export default connect()(EncounterEdit);
