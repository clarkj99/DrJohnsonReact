import React, { Fragment } from "react";
import Hero from "./Hero";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";

class Profile extends React.Component {
  render = () => {
    return (
      <Fragment>
        <Hero title="Profile" />
        <section className="section">
          <div className="container">
            {this.props.user && (
              <Fragment>
                <h2 className="title">
                  {this.props.user.first_name} {this.props.user.last_name},{" "}
                  {this.props.user.role}
                </h2>
                <p className="subtitle">Email: {this.props.user.email}</p>

                <ProfileForm />
              </Fragment>
            )}
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
