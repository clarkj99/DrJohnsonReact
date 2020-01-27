import React, { Fragment } from "react";
import { connect } from "react-redux";
import PatientBanner from "../components/PatientBanner";
import HPI from "../components/HPI";
import RoSystems from "../components/RoSystems";
import ProblemExam from "../components/ProblemExam";
import Steps from "../components/Steps";
import Intake from "../components/Intake";
import Diagnosis from "../components/Diagnosis";

class EncounterEdit extends React.Component {
  render() {
    const { stepNumber } = this.props;
    return (
      <Fragment>
        <PatientBanner />
        <Steps />

        {(stepNumber === 1 || stepNumber === undefined) && <Intake />}
        {stepNumber === 2 && <HPI />}
        {stepNumber === 3 && <RoSystems />}
        {stepNumber === 4 && <ProblemExam />}
        {stepNumber === 5 && <Diagnosis />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { stepNumber: state.steps.stepNumber };
};

export default connect(mapStateToProps)(EncounterEdit);
