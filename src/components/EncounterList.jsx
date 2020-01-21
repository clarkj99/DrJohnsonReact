import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchFunction } from "../utils";
import { withRouter } from "react-router-dom";
import SelectedPatientInfo from "../containers/SelectedPatientInfo";

import {
  addEncounters,
  selectEncounter,
  clearEncounter,
  selectPatient
} from "../actions/rootActions";

class EncounterList extends React.Component {
  state = {
    open: true
  };

  componentDidMount = () => {
    fetchFunction("encounters", "GET", null).then(response => {
      this.props.addEncounters(response);
    });
  };

  handleToggle = encounter => {
    this.props.selectPatient(encounter.patient);
  };

  handleEdit = encounter => {
    this.props.selectPatient(encounter.patient);
    this.props.selectEncounter(encounter);
    this.props.history.push("/providers/encounter");
  };

  encounterList = () => {
    const status = this.state.open ? "open" : "closed";
    if (this.props.selectedPatient) {
      return this.props.encounters.filter(
        encounter =>
          encounter.patient_id === this.props.selectedPatient.id &&
          encounter.status === status
      );
    } else
      return this.props.encounters.filter(
        encounter => encounter.status === status
      );
  };

  handleRadio = () => {
    this.setState({ open: !this.state.open });
  };

  StatusButtons = () => {
    return (
      <div className="level">
        <div className="field">
          <input
            className="is-checkradio is-link"
            id="exampleRadioInline1"
            type="radio"
            name="exampleRadioInline"
            onChange={this.handleRadio}
            checked={this.state.open ? "checked" : ""}
          />
          <label htmlFor="exampleRadioInline1">Open</label>
          <input
            className="is-checkradio is-link"
            id="exampleRadioInline2"
            type="radio"
            name="exampleRadioInline"
            onChange={this.handleRadio}
            checked={!this.state.open ? "checked" : ""}
          />
          <label htmlFor="exampleRadioInline2">Closed</label>
        </div>
      </div>
    );
  };

  Encounters = () => {
    return this.encounterList().map(encounter => {
      return (
        <div className="box" key={encounter.id}>
          <div className="columns">
            <div className="column">
              <div className="buttons">
                <button
                  className="button"
                  onClick={e => this.handleToggle(encounter)}
                >
                  <span className="icon">
                    <i className={"fas fa-user-injured"}></i>
                  </span>
                </button>
                <button
                  className="button"
                  onClick={e => this.handleEdit(encounter)}
                >
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                </button>
              </div>
            </div>
            <div className="column">
              <span>
                {encounter.patient.last_name}, {encounter.patient.first_name}
              </span>
            </div>
            <div className="column">
              <span>
                {new Date(encounter.intake.appointment_at).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="">
            <p>
              <strong>cc: </strong>
              {encounter.intake.complaint.slice(0, 50)}...
            </p>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <h2 className="title">
          <span className="icon">
            <i className="fas fa-user-md"></i>
          </span>
          <span> Encounters</span>
        </h2>
        {this.props.selectedPatient ? (
          <SelectedPatientInfo />
        ) : (
          <h3 className="subtitle">All Users</h3>
        )}

        <this.StatusButtons />
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
    selectedPatient: state.user.selectedPatient
  };
};

const mapDispatchToProps = {
  addEncounters,
  selectEncounter,
  clearEncounter,
  selectPatient
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EncounterList));
