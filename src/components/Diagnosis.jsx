import React from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";

class Diagnosis extends React.Component {
  render() {
    return (
      <section className="encounter-section section">
        <div className="container">
          <h2 className="subtitle">Diagnosis</h2>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { rosystem: state.encounter.selectedEncounter.rosystem };
};
const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(Diagnosis);
