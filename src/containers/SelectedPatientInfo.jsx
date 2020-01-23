import React from "react";
import { fetchFunction } from "../utils";
import { connect } from "react-redux";
import ProviderSelect from "../components/ProviderSelect";
import { Link } from "react-router-dom";
import unknownUser from "../images/unknown-user2.png";
import { addEncounter, clearUser } from "../actions/rootActions";
import Icon from "../components/Icon";

class SelectedPatientInfo extends React.Component {
  state = {
    creatingEncounter: false,
    selectedProvider: ""
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

  render() {
    return (
      <div className="box">
        <article className="media">
          <figure className="media-left image avatar-small is-64x64">
            <img
              src={this.props.selectedPatient.profile.photo || unknownUser}
              alt={this.props.selectedPatient.last_name}
            />
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
          </div>
          <div className="media-right is-link">
            <button
              className="delete is-link"
              onClick={() => this.props.clearUser()}
            ></button>
          </div>
        </article>

        {!this.state.creatingEncounter && (
          <nav className="navbar is-transparent">
            <div className="navbar-item">
              <button className="is-link  button" onClick={this.handleNewClick}>
                <span className="icon">
                  <i className="fas fa-plus-square"></i>
                </span>
                <span>New Encounter</span>
              </button>
            </div>
            <div className="navbar-item">
              <Link to="/providers/patient-profile" className="is-link button">
                <Icon icon="address-card" />
                {/* <span className="icon">
                  <i className="fas fa-edit"></i>
                </span> */}
                <span>Profile</span>
              </Link>
            </div>
            <div className="navbar-item">
              <Link className="is-link button" to="/providers/patient-history">
                <span className="icon">
                  <i className="fas fa-edit"></i>
                </span>
                <span>History</span>
              </Link>
            </div>
          </nav>
        )}
        {this.state.creatingEncounter && (
          <nav className="navbar is-transparent">
            <div className="navbar-item">
              <ProviderSelect
                value={this.state.selectedProvider}
                onChange={this.handleChange}
              />
            </div>
            <div className="navbar-item">
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
            <div className="navbar-item">
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
    );
  }
}

const mapStateToProps = state => {
  return { selectedPatient: state.user.selectedPatient };
};

const mapDispatchToProps = {
  addEncounter,
  clearUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedPatientInfo);
