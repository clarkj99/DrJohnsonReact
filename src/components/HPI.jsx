import React from "react";
import { connect } from "react-redux";
import { updateHPI } from "../actions/rootActions";

class HPI extends React.Component {
  initialState = {
    duration: "",
    duration_units: "",
    aggravating_factors: "",
    context: "",
    location: "",
    severity: ""
  };

  state = { ...this.initialState };

  componentDidMount = () => {
    this.initialState = { ...this.props.hpi };
    this.setState({ ...this.props.hpi });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    fetch(`http://localhost:3000/api/v1/hpi/${this.props.hpi.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        hpi: { ...this.state, [e.target.name]: e.target.value }
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response; //we only get here if there is no error
      })
      .then(res => res.json())
      .then(data => {
        // this.setState(data);
        this.props.updateHPI(data);
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  render() {
    let {
      duration,
      duration_units,
      aggravating_factors,
      context,
      location,
      severity
    } = this.state;

    return (
      <section className="section">
        <div className="container">
          <h2 className="subtitle">History of Present Illness</h2>
          <form className="form">
            <div className="field is-horizontal has-addons">
              <div className="field-label  is-normal">
                <label className="label" htmlFor="duration">
                  Duration
                </label>
              </div>
              <div className="field-body">
                <div className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="number"
                    name="duration"
                    value={duration || ""}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="control">
                  <div className="select">
                    <select
                      name="duration_units"
                      value={duration_units}
                      onChange={this.handleChange}
                    >
                      <option value="">Units</option>
                      <option value="days">days</option>
                      <option value="weeks">weeks</option>
                      <option value="months">months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal has-addons">
              <div className="field-label is-normal">
                <label className="label" htmlFor="severity">
                  Severity
                </label>
              </div>
              <div className="field-body">
                <div className="control is-expanded">
                  <input
                    name="severity"
                    className="slider is-fullwidth is-medium"
                    step="1"
                    min="1"
                    max="10"
                    value={severity || "5"}
                    type="range"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="control">
                  <div className=" field-label is-normal ">
                    <span className="label has-text-link" htmlFor="severity">
                      {severity || "5"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal has-addons">
              <div className="field-label is-normal">
                <label className="label" htmlFor="aggravating_factors">
                  Aggravating Factors
                </label>
              </div>
              <div className="field-body">
                <div className="control is-expanded">
                  <div className="select">
                    <select
                      name="aggravating_factors"
                      value={aggravating_factors}
                      onChange={this.handleChange}
                    >
                      <option value="">Factors</option>
                      <option value="movement">movement</option>
                      <option value="rest">rest</option>
                      <option value="intercourse">intercourse</option>
                      <option value="bowel_movement">bowel movement</option>
                      <option value="urination">urination</option>
                      <option value="pressure">pressure</option>
                      <option value="touch">touch</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal has-addons">
              <div className="field-label  is-normal">
                <label className="label" htmlFor="context">
                  Context
                </label>
              </div>
              <div className="field-body">
                <div className="control is-expanded">
                  <textarea
                    className="textarea"
                    type="text"
                    placeholder="context"
                    name="context"
                    value={context || ""}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="field is-horizontal has-addons">
              <div className="field-label is-normal">
                <label className="label" htmlFor="location">
                  Location
                </label>
              </div>
              <div className="field-body">
                <div className="control is-expanded">
                  <textarea
                    className="textarea"
                    type="text"
                    placeholder="location"
                    name="location"
                    value={location || ""}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { hpi: state.encounter.selectedEncounter.hpi };
};

const mapDispatchToProps = { updateHPI };

export default connect(mapStateToProps, mapDispatchToProps)(HPI);
