import React, { Fragment } from "react";
import { connect } from "react-redux";

import {
  addEncounters,
  selectEncounter,
  clearEncounter,
  startEncounter,
  clearUser
} from "../actions/rootActions";

class EncounterList extends React.Component {
  state = { open: true };

  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/encounters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response; //we only get here if there is no error
      })
      .then(res => res.json())
      .then(data => {
        this.props.addEncounters(data);
      })
      .catch(res => {});
  };

  handleToggle = encounter => {
    if (this.props.selectedEncounter.id === encounter.id)
      this.props.clearEncounter();
    else this.props.selectEncounter(encounter);
  };

  handleEdit = encounter => {
    this.props.startEncounter(encounter);
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
                    <i
                      className={
                        this.props.selectedEncounter.id === encounter.id
                          ? "fas fa-minus"
                          : "fas fa-plus"
                      }
                    ></i>
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
              <span>{new Date(encounter.appointment_at).toLocaleString()}</span>
            </div>
          </div>
          {this.props.selectedEncounter.id === encounter.id && (
            <div className="">
              <p>{encounter.intake.complaint}</p>
              <p>{encounter.hpi.context}</p>
            </div>
          )}
        </div>
      );
    });
  };

  SelectedPatientInfo = props => {
    return (
      <article className="box media">
        <figure className="media-left image avatar-small is-64x64">
          <img src={this.props.selectedPatient.profile.photo} />
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="has-text-weight-bold">
              {this.props.selectedPatient.last_name},{" "}
              {this.props.selectedPatient.first_name}
            </p>
            <p>
              {this.props.selectedPatient.profile.address1} <br />
              {this.props.selectedPatient.profile.city},{" "}
              {this.props.selectedPatient.profile.state}{" "}
              {this.props.selectedPatient.profile.zip}
            </p>
          </div>
          <nav className="level">
            <div className="level-item">
              <a className="is-link  button is-small">
                <span className="icon">
                  <i className="fas fa-plus-square"></i>
                </span>
                <span>New Encounter</span>
              </a>
            </div>
            <div className="level-item">
              <a className="is-link button is-small">
                <span className="icon">
                  <i className="fas fa-edit"></i>
                </span>
                <span> Edit Profile</span>
              </a>
            </div>
          </nav>
        </div>
        <div className="media-right is-link">
          <button
            className="delete is-link"
            onClick={() => this.props.clearUser()}
          ></button>
        </div>
      </article>
    );
  };

  render() {
    return (
      <Fragment>
        <h2 className="title">Encounters</h2>
        {this.props.selectedPatient ? (
          <this.SelectedPatientInfo />
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
  startEncounter,
  clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(EncounterList);
