import React, { Fragment } from "react";
import { connect } from "react-redux";
import NewUser from "../components/NewUser";
import unknownUser from "../images/unknown-user2.png";

import {
  addUsers,
  selectPatient,
  setCreatingPatient
} from "../actions/rootActions";

class Search extends React.Component {
  state = { searchTerm: "" };

  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/users?role=patient", {
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
        this.props.addUsers("patients", data);
      })
      .catch(res => {});
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchResults = () => {
    if (this.state.searchTerm.length >= 1)
      return this.props.patients.filter(patient => {
        return `${patient.last_name}+${patient.first_name}`
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase());
      });
    else return this.props.patients.slice(0, 20);
  };

  handleClick = user => {
    this.props.selectPatient(user);
  };

  SearchResult = props => {
    return (
      <article
        className="box media"
        onClick={e => this.handleClick(props.user)}
      >
        <div className="media-left">
          <figure className="media-left image avatar-small is-64x64">
            <img
              src={props.user.profile.photo || unknownUser}
              alt={props.user.last_name}
            />
          </figure>
        </div>
        <div className="media-content">
          <div className="columns">
            <div className="column">
              {" "}
              <p>
                {props.user.last_name}, {props.user.first_name} <br />
              </p>
            </div>
            <div className="column">
              <p>
                {props.user.profile.address1}
                <br />
                {props.user.profile.city}, {props.user.profile.state}{" "}
                {props.user.profile.zip}
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  };

  render() {
    return (
      <Fragment>
        {this.props.creatingPatient && <NewUser role="patient" />}
        <div className="field">
          <div className="control has-icons-left">
            <span className="icon is-small is-left">
              <i className="fas fa-search"></i>
            </span>

            <input
              className="input"
              name="searchTerm"
              type="search"
              placeholder="name"
              value={this.state.seartTerm}
              onChange={this.handleChange}
              autoComplete="off"
            ></input>
          </div>
        </div>
        <div className="">
          {this.searchResults().length > 0 ? (
            <div className="search-results">
              {this.searchResults().map(user => (
                <this.SearchResult key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div>
              <p className="message">Search for patients by name</p>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    patients: state.user.patients,
    creatingPatient: state.user.creatingPatient
  };
};

const mapDispatchToProps = { addUsers, selectPatient, setCreatingPatient };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
