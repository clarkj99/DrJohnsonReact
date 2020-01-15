import React, { Fragment } from "react";
import { connect } from "react-redux";

import {
  addEncounters,
  selectEncounter,
  clearEncounter,
  startEncounter
} from "../actions/rootActions";
import user from "../reducers/user";

class EncounterList extends React.Component {
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
    if (this.props.selectedUser) {
      return this.props.encounters.filter(
        encounter => encounter.patient_id === this.props.selectedUser.id
      );
    } else return this.props.encounters;
  };

  render() {
    return (
      <Fragment>
        <h2 className="title">Encounters</h2>
        {this.props.selectedUser && <p>{this.props.selectedUser.last_name}</p>}
        {this.encounterList() &&
          this.encounterList().map(encounter => {
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
                      {encounter.patient.last_name},{" "}
                      {encounter.patient.first_name}
                    </span>
                  </div>
                  <div className="column">
                    <span>
                      {new Date(encounter.appointment_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                {this.props.selectedEncounter.id === encounter.id && (
                  <div className="">
                    <p>{encounter.complaint}</p>
                    <p>{encounter.hpi.context}</p>
                  </div>
                )}
              </div>
            );
          })}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    encounters: state.encounter.encounters,
    selectedEncounter: state.encounter.selectedEncounter,
    selectedUser: state.user.selectedUser
  };
};

const mapDispatchToProps = {
  addEncounters,
  selectEncounter,
  clearEncounter,
  startEncounter
};

export default connect(mapStateToProps, mapDispatchToProps)(EncounterList);
