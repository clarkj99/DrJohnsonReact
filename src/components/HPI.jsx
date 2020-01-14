import React from "react";
import { connect } from "react-redux";

class HPI extends React.Component {
  state = {};

  render() {
    let {
      duration,
      duration_units,
      aggravating_factors,
      context,
      location
    } = this.props.hpi;
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
                  />
                </div>

                <div className="control">
                  <div className="select">
                    <select name="duration_units">
                      <option>Units</option>
                      <option value="days">days</option>
                      <option value="weeks">weeks</option>
                      <option value="months">months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label" htmlFor="aggravating_factors">
                  Aggravating Factors
                </label>
              </div>
              <div className="field-body">
                <div className="control">
                  <div className="select">
                    <select name="aggravating_factors">
                      <option>Factors</option>
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
                  />
                </div>
              </div>
            </div>

            <div className="field is-horizontal has-addons">
              <div className="field-label  is-normal">
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

export default connect(mapStateToProps)(HPI);
