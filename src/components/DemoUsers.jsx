import React, { Fragment } from "react";
import { fetchFunction } from "../utils";

class DemoUsers extends React.Component {
  state = { demoUsers: { patient: {}, physician: {} } };
  componentDidMount = () => {
    fetchFunction("demo", "GET")
      .then(data => {
        this.setState({ ...this.state, demoUsers: data });
      })
      .catch(res => {});
  };

  render() {
    return (
      <Fragment>
        <div className="notification is-warning">
          <div className="container">
            <div className="columns has-text-centered">
              <div className="column ">
                <h2 className="subtitle"> Test Logins:</h2>
              </div>
              <div className="column">
                {this.state.demoUsers.patient && (
                  <p>
                    Patient: <em>{this.state.demoUsers.patient.email}</em>
                  </p>
                )}
                {this.state.demoUsers.patient && (
                  <p>
                    Password: <em>Patient1234</em>
                  </p>
                )}
              </div>
              <div className="column">
                {this.state.demoUsers.physician && (
                  <p>
                    Physician: <em>{this.state.demoUsers.physician.email}</em>
                  </p>
                )}
                {this.state.demoUsers.physician && (
                  <p>
                    Password: <em>Physician1234</em>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DemoUsers;
