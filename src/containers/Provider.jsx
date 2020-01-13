import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { add_encounters } from "../actions/rootActions";
import Hero from "../components/Hero";

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

  state = { selectedEncounter: {} };

  handleToggle = encounter => {
    if (this.state.selectedEncounter.id === encounter.id)
      this.setState({ selectedEncounter: {} });
    else this.setState({ selectedEncounter: encounter });
  };

  render() {
    return (
      <Fragment>
        <Hero title="Provider Access" />
        <section className="section">
          <div className="columns">
            <div className="column">
              <h2 className="title">Open Encounters</h2>
              {this.props.encounters &&
                this.props.encounters.map(encounter => {
                  return (
                    <div className="box" key={encounter.id}>
                      <div className="columns">
                        <div className="column">
                          <div className="buttons">
                            <button
                              className="button"
                              onClick={e => this.handleToggle(encounter)}
                            >
                              <span className="icon">
                                <i
                                  className={
                                    this.state.selectedEncounter.id ===
                                    encounter.id
                                      ? "fas fa-minus"
                                      : "fas fa-plus"
                                  }
                                ></i>
                              </span>
                            </button>
                            <button className="button">
                              <span className="icon">
                                <i className="fas fa-edit"></i>
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="column">
                          <span>
                            {encounter.patient.last_name},{" "}
                            {encounter.patient.first_name}
                          </span>
                        </div>
                        <div className="column">
                          <span>
                            {new Date(
                              encounter.appointment_at
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {this.state.selectedEncounter.id === encounter.id && (
                        <div className="">
                          <span>{encounter.complaint}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="is-divider-vertical"></div>

            <div className="column is-one-fifth">
              <h2 className="title">Search</h2>
              <div className="field">
                <div className="control has-icons-left">
                  <span className="icon is-small is-left">
                    <i className="fas fa-search"></i>
                  </span>

                  <input
                    className="input"
                    type="search"
                    placeholder="patient's last name"
                    results={5}
                  ></input>
                </div>
              </div>
            </div>
            <div className="is-divider-vertical"></div>

            <div className="column is-one-fifth">
              <h2 className="title">Add A New Patient</h2>
              <Link to="/providers/newpatient" className="button is-link ">
                Create New Patient
              </Link>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { encounters: state.encounter.encounters };
};

const mapDispatchToProps = { add_encounters };

export default connect(mapStateToProps, mapDispatchToProps)(Provider);
