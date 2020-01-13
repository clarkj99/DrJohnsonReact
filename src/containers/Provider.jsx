import React, { Fragment } from "react";
import { connect } from "react-redux";
import EncounterSelection from "./EncounterSelection";
import EncounterEdit from "./EncounterEdit";

class Provider extends React.Component {
  render() {
    return (
      <Fragment>
        {this.props.editingEncounter ? (
          <EncounterEdit />
        ) : (
          <EncounterSelection />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    editingEncounter: state.encounter.editingEncounter
  };
};

export default connect(mapStateToProps)(Provider);
