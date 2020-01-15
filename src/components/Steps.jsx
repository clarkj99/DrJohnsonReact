import React from "react";
import { connect } from "react-redux";
import { setStep } from "../actions/rootActions";

const Icon = () => {
  return (
    <span class="icon">
      <i class="fas fa-check"></i>
    </span>
  );
};

const Steps = props => {
  return (
    <section className="section">
      <div className="steps" id="stepsDemo">
        <div
          className={
            props.stepNumber >= 1
              ? "step-item is-active is-success"
              : "step-item"
          }
          onClick={e => props.setStep(1)}
        >
          <div className="step-marker">
            {props.stepNumber === 1 ? <Icon /> : 1}
          </div>
          <div className="step-details">
            <p className="step-title">History of Present Illness</p>
          </div>
        </div>
        <div
          className={
            props.stepNumber >= 2
              ? "step-item is-active is-success"
              : "step-item "
          }
          onClick={e => props.setStep(2)}
        >
          <div className="step-marker">
            {props.stepNumber === 2 ? <Icon /> : 2}
          </div>
          <div className="step-details">
            <p className="step-title">Review of Systems</p>
          </div>
        </div>
        <div
          className={
            props.stepNumber >= 3
              ? "step-item is-active is-success"
              : "step-item "
          }
          onClick={e => props.setStep(3)}
        >
          <div className="step-marker">
            {" "}
            {props.stepNumber === 3 ? <Icon /> : 3}
          </div>
          <div className="step-details">
            <p className="step-title">Problem Exam</p>
          </div>
        </div>
        <div
          className={
            props.stepNumber >= 4
              ? "step-item is-active is-success"
              : "step-item is-large"
          }
          onClick={e => props.setStep(4)}
        >
          <div className="step-marker">
            {" "}
            {props.stepNumber === 4 ? <Icon /> : 4}
          </div>
          <div className="step-details">
            <p className="step-title">Diagnosis</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return { stepNumber: state.steps.stepNumber };
};

const mapDispatchToProps = { setStep };

export default connect(mapStateToProps, mapDispatchToProps)(Steps);
