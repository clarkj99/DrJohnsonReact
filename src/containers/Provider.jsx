import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { add_encounters } from "../actions/rootActions";

class Provider extends React.Component {
  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/encounters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.add_encounters(data);
      });
  };

  render() {
    return (
      <section className="section">
        <div className="columns">
          <div className="column ">
            <h2 className="title">Add A New Patient</h2>
            <Link to="/provider/newpatient" className="button is-link is-large">
              Create New Patient
            </Link>
          </div>

          <div className="is-divider-vertical"></div>

          <div className="column">
            <h2 className="title">Open Encounters</h2>
            {this.props.encounters &&
              this.props.encounters.map(encounter => {
                return (
                  <div className="box " key={encounter.id}>
                    <p>
                      <span>
                        {encounter.patient.last_name},{" "}
                        {encounter.patient.first_name}
                      </span>
                      {" | "}
                      <span>{encounter.appointment_at}</span>
                    </p>
                    <p>{encounter.complaint}</p>
                  </div>
                );
              })}
          </div>

          <div className="is-divider-vertical"></div>

          <div className="column">
            <h2 className="title">Search</h2>
            <div className="field">
              <div className="control has-icons-left is-loading">
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>

                <input
                  className="input"
                  type="text"
                  placeholder="patient's last name"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return { encounters: state.encounter.encounters };
};

const mapDispatchToProps = { add_encounters };

export default connect(mapStateToProps, mapDispatchToProps)(Provider);
