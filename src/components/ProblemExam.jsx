import React from "react";
import { connect } from "react-redux";

class ProblemExam extends React.Component {
  state = {};
  render() {
    return (
      <section className="section">
        <div className="container">
          <h2 className="subtitle">OB/GYN Problem Exam</h2>
          <form className="form"></form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { problem_exam: state.encounter.selectedEncounter.problem_exam };
};

export default connect(mapStateToProps)(ProblemExam);
