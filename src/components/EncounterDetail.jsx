import React, { Fragment } from "react";
import { connect } from "react-redux";

const EncounterDetail = () => {
  return (
    <Fragment>
      <h2 className="title">Details</h2>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    selectedEncounter: state.encounter.selectedEncounter
  };
};

export default connect(mapStateToProps)(EncounterDetail);
