import React from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Textarea from "./Textarea";
import { fetchFunction } from "../utils";

class Diagnosis extends React.Component {
  initialDiagnosis = {
    orders: "",
    follow_up: "",
    icd: ""
  };

  state = {
    diagnosis: { ...this.initialDiagnosis },
    searchResults: [],
    searchTerm: ""
  };

  componentDidMount = () => {
    this.initialDiagnosis = { ...this.props.diagnosis };
    this.setState({ diagnosis: { ...this.props.diagnosis } });
  };

  handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });

    fetchFunction(`diagnosis/${this.props.diagnosis.id}`, "PATCH", {
      diagnosis: { ...this.state.diagnosis, [e.target.name]: value }
    })
      .then(data => {
        this.props.updateEncounterChild("diagnosis", data);
        this.setState({ diagnosis: data });
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  handleSearchChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // import {fetchFunction} from '../utils'
    fetchFunction(`icd10s?term=${e.target.value}`, "GET")
      .then(searchResults => {
        this.setState({ searchResults });
      })
      .catch(res => {});
  };

  handleClick = icd => {
    this.handleChange({
      target: {
        type: "text",
        value: `${icd.code} - ${icd.description}`,
        name: "icd"
      }
    });
    this.handleSearchChange({ target: { name: "searchTerm", value: "" } });
  };

  handleMouseOver = e => {
    console.dir(e.target);
    if (e.target.type === "div")
      e.target.className =
        "has-text-left box has-background-link has-text-light";
  };

  handleMouseOut = e => {
    if (e.target.type === "div") e.target.className = "has-text-left box";
  };

  render() {
    const { orders, follow_up, icd } = this.state.diagnosis;
    const { searchResults, searchTerm } = this.state;
    return (
      <section className="encounter-section section">
        <div className="container">
          <h2 className="subtitle">Diagnosis</h2>
          <fieldset disabled={this.props.status !== "open"}>
            <div className="field is-horizontal has-addons">
              <div className="field-label is-normal">
                <label className="label">ICD-10</label>
              </div>

              <div className="field-body">
                <div className="field has-addons">
                  <div className="control">
                    <button className="button is-static icd-text has-text-left">
                      {icd}
                    </button>
                  </div>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="search"
                      name="searchTerm"
                      value={searchTerm}
                      onChange={this.handleSearchChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                  <div className="control is-expanded">
                    {searchResults.length > 0 && (
                      <div className="icd-search-results box">
                        {searchResults.map(result => (
                          // eslint-disable-next-line
                          <a
                            href="#"
                            key={result.id}
                            className="has-text-left level"
                            onClick={() => this.handleClick(result)}
                          >
                            {result.code} - {result.description}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Textarea
              field="orders"
              label="Orders"
              value={orders}
              handleChange={this.handleChange}
            />
            <Textarea
              field="follow_up"
              label="Follow Up"
              value={follow_up}
              handleChange={this.handleChange}
            />
          </fieldset>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagnosis: state.encounter.selectedEncounter.diagnosis,
    status: state.encounter.selectedEncounter.status
  };
};
const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(Diagnosis);
