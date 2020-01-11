import React, { Fragment } from "react";
import Hero from "./Hero";
import { connect } from "react-redux";

class Profile extends React.Component {
  render = () => {
    console.log(this.props);
    return (
      <Fragment>
        <Hero title="Profile" />
        <section class="section">
          <div className="container">
            {this.props.user && (
              <Fragment>
                <h2 className="title">
                  {this.props.user.first_name} {this.props.user.last_name},{" "}
                  {this.props.user.role}
                </h2>
                <p>Email: {this.props.user.email}</p>
              </Fragment>
            )}
          </div>
        </section>
      </Fragment>
    );
  };
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Profile);
