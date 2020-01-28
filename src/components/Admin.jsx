import React, { Fragment } from "react";
import { connect } from "react-redux";
import Hero from "./Hero";
import NewUser from "./NewUser";
import { fetchFunction } from "../utils";
import unknownUser from "../images/unknown-user2.png";
import {
  addEncounters,
  deleteEncounter,
  setCreatingPatient,
  addUsers
} from "../actions/rootActions";
import Icon from "./Icon";

class Admin extends React.Component {
  state = { physicians: [] };
  componentDidMount = () => {
    fetchFunction("users?role=physician", "GET", null)
      // .then(response => this.setState({ physicians: response }))
      .then(response => this.props.addUsers("physicians", response))
      .catch(res => {});
    fetchFunction("encounters", "GET", null)
      .then(response => {
        this.props.addEncounters(response);
      })
      .catch(res => {});
  };

  handleDelete = encounter => {
    fetchFunction(`encounter/${encounter.id}`, "DELETE", null)
      .then(response => {
        if (!response.error) this.props.deleteEncounter(response);
      })
      .catch(res => {});
  };

  handleClick = () => {
    this.props.setCreatingPatient(true);
  };

  render() {
    return (
      <Fragment>
        <Hero title="Admin" />
        <section className="section">
          <div className="">
            <div className="columns">
              {/* <div className="column">
                <h2 className="title">Create New Physician</h2>
                <NewUser role="physician" />
              </div>
              <div className="is-divider-vertical"></div> */}
              <div className="column is-two-fifths">
                <div className="level">
                  <div className="level-left">
                    {!this.props.creatingPatient ? (
                      <h2 className="title">Physicians</h2>
                    ) : (
                      <h2 className="title">Create New Physician</h2>
                    )}
                  </div>
                  <div className="level-right">
                    {!this.props.creatingPatient && (
                      <button
                        onClick={this.handleClick}
                        className="button is-link "
                      >
                        <span className="icon">
                          <i className="fas fa-plus-square"></i>
                        </span>
                        <span>New Physician</span>
                      </button>
                    )}
                  </div>
                </div>
                {this.props.creatingPatient ? (
                  <NewUser role="physician" />
                ) : (
                  <Fragment>
                    {this.props.physicians.map(physician => (
                      <div key={physician.id} className="box">
                        <article className="media">
                          <div className="media-left">
                            <figure className="media-left image avatar-small is-64x64">
                              <img
                                src={physician.profile.photo || unknownUser}
                                alt={physician.last_name}
                              />
                            </figure>
                          </div>
                          <div className="media-content">
                            <div className="columns">
                              <div className="column">
                                {" "}
                                <p>
                                  {physician.last_name}, {physician.first_name}{" "}
                                  <br />
                                </p>
                              </div>
                              <div className="column">
                                <p>
                                  {physician.profile.address1}
                                  <br />
                                  {physician.profile.city},{" "}
                                  {physician.profile.state}{" "}
                                  {physician.profile.zip}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* <div className="media-right">
                        <button className="button is-link">Delete</button>
                      </div> */}
                        </article>
                      </div>
                    ))}
                  </Fragment>
                )}
              </div>
              <div className="is-divider-vertical"></div>
              <div className="column">
                <h1 className="title">Encounters</h1>
                {this.props.encounters && this.props.encounters.length > 0 && (
                  <div className="search-results">
                    {this.props.encounters.map(encounter => (
                      <div className="box" key={encounter.id}>
                        <div className="columns">
                          <div className="column">
                            <p>
                              <Icon icon="user-injured" />
                              <span>
                                {encounter.patient.last_name},{" "}
                                {encounter.patient.first_name}
                              </span>
                            </p>
                            <p>
                              <Icon icon="user-md" />
                              <span>
                                {encounter.provider.last_name},{" "}
                                {encounter.provider.first_name}
                              </span>
                            </p>
                          </div>
                          <div className="column">
                            {Object.getOwnPropertyNames(encounter.intake)
                              .length !== 0 && (
                              <span>
                                {new Date(
                                  encounter.intake.appointment_at
                                ).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="column">
                            <div className="media-right">
                              <button
                                className="button is-link"
                                onClick={() => this.handleDelete(encounter)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          {encounter.intake.complaint && (
                            <p>
                              <strong>cc: </strong>
                              {encounter.intake.complaint.slice(0, 50)}...
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.user,
    encounters: state.encounter.encounters,
    creatingPatient: state.user.creatingPatient,
    physicians: state.user.physicians
  };
};
const mapDispatchToProps = {
  addEncounters,
  deleteEncounter,
  setCreatingPatient,
  addUsers
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
