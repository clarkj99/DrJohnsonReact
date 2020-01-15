import React, { Fragment } from "react";
import { connect } from "react-redux";
import PatientBanner from "../components/PatientBanner";
import HPI from "../components/HPI";
import RoSystems from "../components/RoSystems";
import ProblemExam from "../components/ProblemExam";
import Steps from "../components/Steps";

class EncounterEdit extends React.Component {
  render() {
    const { stepNumber } = this.props;
    return (
      <Fragment>
        <PatientBanner />
        <Steps />

        {stepNumber === 1 && <HPI />}
        {stepNumber === 2 && <RoSystems />}
        {stepNumber === 3 && <ProblemExam />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { stepNumber: state.steps.stepNumber };
};

export default connect(mapStateToProps)(EncounterEdit);
