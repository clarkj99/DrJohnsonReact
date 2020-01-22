import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchFunction } from "../utils";
import {
  addEncounters,
  selectEncounter,
  clearEncounter,
  startEncounter,
  clearUser
} from "../actions/rootActions";

class PatientList extends React.Component {
  componentDidMount = () => {
    fetchFunction(`/iencounters`, "GET")
      .then(data => {
        this.props.addEncounters(data);
      })
      .catch(res => {});
  };

  handleView = encounter => {
    this.props.selectEncounter(encounter);
  };

  encounterList = () => {
    const status = "open";
    return this.props.encounters.filter(
      encounter =>
        encounter.patient_id === this.props.selectedPatient.id &&
        encounter.status === status
    );
  };

  Encounters = () => {
    return this.encounterList().map(encounter => {
      return (
        <div
          className="box"
          key={encounter.id}
          onClick={() => this.handleView(encounter)}
        >
          <div className="columns">
            <div className="column">
              <span>
                Seen by: {encounter.provider.last_name},{" "}
                {encounter.provider.first_name}
              </span>
              {/* <span>
                {encounter.patient.last_name}, {encounter.patient.first_name}
              </span> */}
            </div>
            <div className="column">
              <span>
                {new Date(encounter.intake.appointment_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <h2 className="title">Encounters</h2>
        <h3 className="subtitle">
          {this.props.selectedPatient.last_name},{" "}
          {this.props.selectedPatient.first_name}
        </h3>
        {this.encounterList().length > 0 ? (
          <this.Encounters />
        ) : (
          <div className=" box has-dark">No encounters found</div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    encounters: state.encounter.encounters,
    selectedEncounter: state.encounter.selectedEncounter,
    selectedPatient: state.login.user
  };
};

const mapDispatchToProps = {
  addEncounters,
  selectEncounter,
  clearEncounter,
  startEncounter,
  clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
