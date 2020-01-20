import React, { Fragment } from "react";
import Hero from "./Hero";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";
import PhotoBooth from "./PhotoBooth";
import { updateLoginProfile } from "../actions/rootActions";

import BackArrow from "./BackArrow";

class Profile extends React.Component {
  render = () => {
    return (
      <Fragment>
        <BackArrow />
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
                  updateProfile={this.props.updateLoginProfile}
                />
              </div>
              <div className="column">
                <ProfileForm
                  user={this.props.user}
                  updateProfile={this.props.updateLoginProfile}
                />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  };
}

function mapStateToProps(state) {
  return { user: state.login.user };
}

const mapDispatchToProps = {
  updateLoginProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
