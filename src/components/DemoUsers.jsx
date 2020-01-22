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
          <div className="columns">
            <div className="column">
              <h2 className="subtitle"> Test Logins:</h2>
            </div>
            <div className="column">
              <p>
                Patient: <em>{this.state.demoUsers.patient.email}</em>
              </p>
              <p>
                Password: <em>Patient1234</em>
              </p>
            </div>
            <div className="column">
              <p>
                Physician: <em>{this.state.demoUsers.physician.email}</em>
              </p>
              <p>
                Password: <em>Physician1234</em>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DemoUsers;
