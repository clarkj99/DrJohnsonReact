import React, { Fragment } from "react";
import Hero from "./Hero";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";
import PhotoBooth from "./PhotoBooth";

class Profile extends React.Component {
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
                <PhotoBooth />
              </div>
              <div className="column">
                <ProfileForm />
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

export default connect(mapStateToProps)(Profile);
