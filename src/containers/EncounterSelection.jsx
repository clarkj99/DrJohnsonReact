import React, { Fragment } from "react";
import EncounterList from "../components/EncounterList";
import Search from "../components/Search";
import NewUser from "../components/NewUser";
import { connect } from "react-redux";
import { setCreatingPatient } from "../actions/rootActions";

class EncounterSelection extends React.Component {
  handleClick = () => {
    this.props.setCreatingPatient(true);
  };

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="columns">
            <div className="column is-two-fifths">
              <div className="level">
                <div className="level-left">
                  {this.props.creatingPatient ? (
                    <h2 className="title">
                      <span className="icon">
                        <i className="fas fa-user-injured"></i>
                      </span>
                      <span> New Patient</span>
                    </h2>
                  ) : (
                    <h2 className="title">
                      <span className="icon">
                        <i className="fas fa-search"></i>
                      </span>
                      <span> Search</span>
                    </h2>
                  )}
                </div>
                <div className="level-right">
                  {!this.props.creatingPatient && (
                    <button onClick={this.handleClick} className="button  ">
                      <span className="icon">
                        <i className="fas fa-plus-square"></i>
                      </span>
                      <span>New Patient</span>
                    </button>
                  )}
                </div>
              </div>
              {this.props.creatingPatient ? (
                <NewUser role="patient" />
              ) : (
                <Search />
              )}
            </div>

            <div className="is-divider-vertical"></div>

            <div className="column">
              <EncounterList />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { creatingPatient: state.user.creatingPatient };
};

const mapDispatchToProps = {
  setCreatingPatient
};

export default connect(mapStateToProps, mapDispatchToProps)(EncounterSelection);
