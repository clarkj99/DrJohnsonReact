import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";
import PhotoBooth from "./PhotoBooth";
import { updatePatientProfile } from "../actions/rootActions";

class PatientProfile extends React.Component {
  render = () => {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h2 className="title">
                  {this.props.user.first_name} {this.props.user.last_name},{" "}
                  {this.props.user.role}
                </h2>
                <p className="subtitle">Email: {this.props.user.email}</p>
                <PhotoBooth
                  profile={this.props.user.profile}
                  photo={this.props.user.profile.photo}
                  updateProfile={this.props.updatePatientProfile}
                />
              </div>
              <div className="column">
                <ProfileForm
                  user={this.props.user}
                  updateProfile={this.props.updatePatientProfile}
                />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  };
}

const mapStateToProps = state => {
  return { user: state.user.selectedPatient };
};

const mapDispatchToProps = {
  updatePatientProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);
