import React from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Checkbox from "./Checkbox";

class RoSystems extends React.Component {
  initialState = {
    fever: false,
    fatigue: false,
    appetite: false,
    weight: false,
    constitutional_details: "",
    depression: false,
    anxiety: false,
    psychiatric_details: "",
    trouble_swallowing: false,
    heartburn: false,
    nausea: false,
    vomiting: false,
    irregular_bm: false,
    gastrointestinal_details: "",
    trouble_urinating: false,
    abnormal_bleeding: false,
    vaginal_discharge: false,
    genital_urinary_description: "",
    joint_pain: false,
    joint_swelling: false,
    musculoskeletal_details: ""
  };

  state = { ...this.initialState };

  componentDidMount = () => {
    this.initialState = { ...this.props.rosystem };
    this.setState({ ...this.props.rosystem });
  };

  handleChange = e => {
    console.log(e.target);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });

    fetch(`http://localhost:3000/api/v1/rosystem/${this.props.rosystem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        rosystem: { ...this.state, [e.target.name]: value }
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
        this.props.updateEncounterChild("rosystem", data);
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  render() {
    let {
      fever,
      fatigue,
      appetite,
      weight,
      constitutional_details,
      depression,
      anxiety,
      psychiatric_details,
      trouble_swallowing,
      heartburn,
      nausea,
      vomiting,
      irregular_bm,
      gastrointestinal_details,
      trouble_urinating,
      abnormal_bleeding,
      vaginal_discharge,
      genital_urinary_description,
      joint_pain,
      joint_swelling,
      musculoskeletal_details
    } = this.props.rosystem;

    return (
      <section className="section">
        <div className="container">
          <h2 className="subtitle">Review of Systems</h2>
          <hr />
          <form className="form">
            <div className="field is-horizontal has-addons">
              <div className="field-label is-normal">
                <label className="label">Constitutional</label>
              </div>
              <Checkbox
                field="fever"
                label="Fever"
                value={fever}
                handleChange={this.handleChange}
              />
              <Checkbox
                field="fatigue"
                label="Fatigue"
                value={fatigue}
                handleChange={this.handleChange}
              />
              <Checkbox
                field="appetite"
                label="Appetite"
                value={appetite}
                handleChange={this.handleChange}
              />
              <Checkbox
                field="weight"
                label="Weight"
                value={weight}
                handleChange={this.handleChange}
              />
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { rosystem: state.encounter.selectedEncounter.rosystem };
};
const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(RoSystems);
