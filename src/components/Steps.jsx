import React from "react";
import { connect } from "react-redux";
import { setStep } from "../actions/rootActions";

const Icon = props => {
  return (
    <span className="icon">
      <i className={`fas fa-${props.icon}`}></i>
    </span>
  );
};

const stepClass = (stepNumber, myStep) => {
  switch (true) {
    case myStep < stepNumber:
      return "step-item is-completed is-dark ";
    case myStep === stepNumber:
      return "step-item is-active is-link";
    default:
      return "step-item";
  }
};

const Step = props => {
  return (
    <div
      className={stepClass(props.stepNumber, props.myStep)}
      onClick={e => props.setStep(props.myStep)}
    >
      <div className="step-marker">
        {props.stepNumber === props.myStep ? (
          <Icon icon={props.icon} />
        ) : (
          <Icon icon={props.icon} />
          // props.myStep
        )}
      </div>
      <div className="step-details">
        <p
          className={
            props.stepNumber === props.myStep
              ? "box step-title has-text-link "
              : "step-title has-text-dark"
          }
        >
          {props.title}
        </p>
      </div>
    </div>
  );
};

const Steps = props => {
  return (
    <section className="steps-section section">
      <div className="steps is-medium" id="encounterSteps">
        <Step
          stepNumber={props.stepNumber}
          myStep={1}
          icon="user"
          title="Intake"
          setStep={props.setStep}
        />

        <Step
          stepNumber={props.stepNumber}
          myStep={2}
          icon="user-injured"
          title="History of Present Illness"
          setStep={props.setStep}
        />

        <Step
          stepNumber={props.stepNumber}
          myStep={3}
          icon="question"
          title="Review of Systems"
          setStep={props.setStep}
        />

        <Step
          stepNumber={props.stepNumber}
          myStep={4}
          icon="stethoscope"
          title="Problem Exam"
          setStep={props.setStep}
        />

        <Step
          stepNumber={props.stepNumber}
          myStep={5}
          icon="user-md"
          title="Diagnosis"
          setStep={props.setStep}
        />
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return { stepNumber: state.steps.stepNumber };
};

const mapDispatchToProps = { setStep };

export default connect(mapStateToProps, mapDispatchToProps)(Steps);
