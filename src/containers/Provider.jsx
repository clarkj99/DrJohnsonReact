import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Provider = props => {
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
};
const mapStateToProps = state => {
  return { encounters: state.encounters };
};

export default connect(mapStateToProps)(Provider);
