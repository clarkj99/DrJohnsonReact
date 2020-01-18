import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  addEncounters,
  selectEncounter,
  clearEncounter,
  startEncounter,
  clearUser
} from "../actions/rootActions";

class PatientList extends React.Component {
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

  handleView = encounter => {
    this.props.selectEncounter(encounter);
  };

  encounterList = () => {
    const status = "open";
    return this.props.encounters.filter(
      encounter =>
        encounter.patient_id === this.props.selectedUser.id &&
        encounter.status === status
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
                  onClick={e => this.handleView(encounter)}
                >
                  <span className="icon">
                    <i className="fas fa-eye"></i>
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

          <div className="">
            <p>{encounter.intake.complaint}</p>
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
          {this.props.selectedUser.last_name},{" "}
          {this.props.selectedUser.first_name}
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
    selectedUser: state.login.user
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
