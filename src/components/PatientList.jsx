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
import Icon from "./Icon";
import unknownUser from "../images/unknown-user2.png";

class PatientList extends React.Component {
  componentDidMount = () => {
    fetchFunction(`encounters`, "GET")
      .then(data => {
        this.props.addEncounters(data);
      })
      .catch(res => {});
  };

  handleView = encounter => {
    this.props.selectEncounter(encounter);
  };

  encounterList = () => {
    const status = "closed";
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
              <Icon icon="user-md" />
              <span>
                {encounter.provider.last_name}, {encounter.provider.first_name}
              </span>
              {/* <span>
                {encounter.patient.last_name}, {encounter.patient.first_name}
              </span> */}
            </div>
            <div className="column">
              <span>
                Appointment:{" "}
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
        <article className="media">
          <figure className="media-left image avatar-small is-64x64">
            <img
              src={this.props.selectedPatient.profile.photo || unknownUser}
              alt={this.props.selectedPatient.last_name}
            />
          </figure>
          <div className="media-content">
            <div className="field">
              <h2 className="title">
                {this.props.selectedPatient.last_name},{" "}
                {this.props.selectedPatient.first_name}
              </h2>
              <p className="subtitle">
                {this.props.selectedPatient.profile.address1} <br />
                {this.props.selectedPatient.profile.city},{" "}
                {this.props.selectedPatient.profile.state}{" "}
                {this.props.selectedPatient.profile.zip}
              </p>
            </div>
          </div>
        </article>
        <hr />
        {/* <h2 className="title">
          <Icon icon="user" />{" "}
          <span>
            {this.props.selectedPatient.last_name},{" "}
            {this.props.selectedPatient.first_name}
          </span>
        </h2> */}
        <h3 className="title">Encounters</h3>
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
