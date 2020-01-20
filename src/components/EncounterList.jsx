import React, { Fragment } from "react";
import { connect } from "react-redux";
import unknownUser from "../images/unknown-user2.png";
import { fetchFunction } from "../utils";
import ProviderSelect from "./ProviderSelect";

import {
  addEncounters,
  addEncounter,
  selectEncounter,
  clearEncounter,
  startEncounter,
  clearUser
} from "../actions/rootActions";

class EncounterList extends React.Component {
  state = {
    open: true,
    creatingEncounter: false,
    selectedProvider: ""
  };

  componentDidMount = () => {
    fetchFunction("encounters", "GET", null).then(response => {
      this.props.addEncounters(response);
    });
  };

  handleToggle = encounter => {
    if (this.props.selectedEncounter.id === encounter.id)
      this.props.clearEncounter();
    else this.props.selectEncounter(encounter);
  };

  handleEdit = encounter => {
    this.props.startEncounter(encounter);
  };

  handleChange = e => {
    this.setState({ selectedProvider: e.target.value });
  };

  handleCancel = () => {
    this.setState({ creatingEncounter: false });
  };

  handleNewClick = () => {
    this.setState({ creatingEncounter: true });
  };

  handleCreateEncounter = () => {
    fetchFunction("encounters", "POST", {
      encounter: {
        patient_id: this.props.selectedPatient.id,
        provider_id: this.state.selectedProvider,
        status: "open"
      }
    })
      .then(response => {
        this.props.addEncounter(response);
        this.setState({ creatingEncounter: false, selectedProvider: "" });
      })
      .catch(error => this.setState({ error }));
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
          <img src={this.props.selectedPatient.profile.photo || unknownUser} />
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
          {!this.state.creatingEncounter && (
            <nav className="level">
              <div className="level-item">
                <button
                  className="is-link  button"
                  onClick={this.handleNewClick}
                >
                  <span className="icon">
                    <i className="fas fa-plus-square"></i>
                  </span>
                  <span>New Encounter</span>
                </button>
              </div>
              <div className="level-item">
                <button className="is-link button">
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                  <span>Profile</span>
                </button>
              </div>
              <div className="level-item">
                <button className="is-link button">
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                  <span>History</span>
                </button>
              </div>
            </nav>
          )}
          {this.state.creatingEncounter && (
            <nav className="level">
              <div className="level-item">
                <ProviderSelect
                  value={this.state.selectedProvider}
                  onChange={this.handleChange}
                />
              </div>
              <div className="level-item">
                <button
                  className="button is-link"
                  onClick={this.handleCreateEncounter}
                  disabled={this.state.selectedProvider === ""}
                >
                  <span className="icon">
                    <i className="fas fa-plus-square"></i>
                  </span>
                  <span>Create Encounter</span>
                </button>
              </div>
              <div className="level-item">
                <button className="button is-link" onClick={this.handleCancel}>
                  <span className="icon">
                    <i className="fas fa-ban"></i>
                  </span>
                  <span>Cancel</span>
                </button>
              </div>
            </nav>
          )}
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
  addEncounter,
  selectEncounter,
  clearEncounter,
  startEncounter,
  clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(EncounterList);
