import React from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";

class Diagnosis extends React.Component {
  initialState = {
    orders: "",
    follow_up: "",
    icd: ""
  };

  state = { ...this.initialState };

  componentDidMount = () => {
    this.initialState = { ...this.props.intake };
    this.setState({ ...this.props.intake });
  };

  handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });

    fetch(`http://localhost:3000/api/v1/diagnosis/${this.props.diagnosis.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        diagnosis: { ...this.state, [e.target.name]: value }
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
        this.props.updateEncounterChild("diagnosis", data);
        this.setState(data);
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  render() {
    let { orders, follow_up, icd } = this.props.diagnosis;
    return (
      <section className="encounter-section section">
        <div className="container">
          <h2 className="subtitle">Diagnosis</h2>

          <div className="field is-horizontal has-addons">
            <div className="field-label  is-normal">
              <label className="label">ICD-10</label>
            </div>

            <div className="field-body">
              <div className="control">
                <input className="input" />
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
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { diagnosis: state.encounter.selectedEncounter.diagnosis };
};
const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(Diagnosis);