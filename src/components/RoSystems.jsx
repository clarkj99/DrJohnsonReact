import React from "react";
import { connect } from "react-redux";

class RoSystems extends React.Component {
  state = {};
  render() {
    return (
      <section className="section">
        <div className="container">
          <h2 className="subtitle">Review of Systems</h2>
          <form className="form"></form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { rosystems: state.encounter.selectedEncounter.rosystems };
};

export default connect(mapStateToProps)(RoSystems);
