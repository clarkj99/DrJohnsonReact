import React, { Fragment } from "react";
import EncounterList from "../components/EncounterList";
import Search from "../components/Search";
import NewUser from "../components/NewUser";
import { connect } from "react-redux";
import { setCreatingPatient } from "../actions/rootActions";

class EncounterSelection extends React.Component {
  handleClick = () => {
    // this.setState({ creatingPatient: true });
    this.props.setCreatingPatient(true);
  };

  render() {
    return (
      <Fragment>
        {/* <Hero title="Provider Access" /> */}
        <section className="section">
          <div className="columns">
            <div className="column is-one-fifth">
              {!this.props.creatingPatient ? (
                <Fragment>
                  <h2 className="title">Add A New Patient</h2>
                  <button
                    onClick={this.handleClick}
                    className="button is-link "
                  >
                    New Patient
                  </button>
                </Fragment>
              ) : (
                <NewUser role="patient" />
              )}
            </div>
            <div className="is-divider-vertical"></div>
            <div className="column">
              <Search />
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

// export default EncounterSelection;
