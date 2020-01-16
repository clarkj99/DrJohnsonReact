import React, { Fragment } from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";

class Intake extends React.Component {
  render() {
    return <Fragment></Fragment>;
  }
}

const mapStateToProps = state => {
  return { rosystem: state.encounter.selectedEncounter.rosystem };
};
const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(Intake);
