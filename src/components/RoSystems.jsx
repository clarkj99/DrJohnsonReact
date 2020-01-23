import React from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Checkbox from "./Checkbox";
import Textarea from "./Textarea";
import { fetchFunction } from "../utils";

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
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });

    // fetch(`http://localhost:3000/api/v1/rosystem/${this.props.rosystem.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`
    //   },
    //   body: JSON.stringify({
    //     rosystem: { ...this.state, [e.target.name]: value }
    //   })
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw Error(response.statusText);
    //     }
    //     return response; //we only get here if there is no error
    //   })
    //   .then(res => res.json())
    fetchFunction(`rosystem/${this.props.rosystem.id}`, "PATCH", {
      rosystem: { ...this.state, [e.target.name]: value }
    })
      .then(data => {
        this.props.updateEncounterChild("rosystem", data);
        this.setState(data);
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
    } = this.state;

    return (
      <section className="encounter-section section">
        <div className="container">
          <h2 className="subtitle">Review of Systems</h2>
          <form className="form">
            <fieldset disabled={this.props.status !== "open"}>
              <div className="field is-horizontal has-addons">
                <div className="field-label is-normal">
                  <label className="label">Constitutional</label>
                </div>
                <div className="field-body">
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
              </div>

              <Textarea
                field="constitutional_details"
                label="Constitutional Details"
                value={constitutional_details}
                handleChange={this.handleChange}
              />

              <div className="field is-horizontal has-addons">
                <div className="field-label is-normal">
                  <label className="label">Psychiatric</label>
                </div>
                <div className="field-body">
                  <Checkbox
                    field="depression"
                    label="Depression"
                    value={depression}
                    handleChange={this.handleChange}
                  />
                  <Checkbox
                    field="anxiety"
                    label="Anxiety"
                    value={anxiety}
                    handleChange={this.handleChange}
                  />
                </div>
              </div>

              <Textarea
                field="psychiatric_details"
                label="Psychiatric Details"
                value={psychiatric_details}
                handleChange={this.handleChange}
              />

              <div className="field is-horizontal has-addons">
                <div className="field-label is-normal">
                  <label className="label">Gastrointestinal</label>
                </div>
                <div className="field-body">
                  <Checkbox
                    field="trouble_swallowing"
                    label="Trouble Swallowing"
                    value={trouble_swallowing}
                    handleChange={this.handleChange}
                  />
                  <Checkbox
                    field="heartburn"
                    label="Heartburn"
                    value={heartburn}
                    handleChange={this.handleChange}
                  />
                  <Checkbox
                    field="nausea"
                    label="Nausea"
                    value={nausea}
                    handleChange={this.handleChange}
                  />
                  <Checkbox
                    field="vomiting"
                    label="Vomiting"
                    value={vomiting}
                    handleChange={this.handleChange}
                  />
                  <Checkbox
                    field="irregular_bm"
                    label="Irregular Bowel Movement"
                    value={irregular_bm}
                    handleChange={this.handleChange}
                  />
                </div>
              </div>

              <Textarea
                field="gastrointestinal_details"
                label="Gastrointestinal Details"
                value={gastrointestinal_details}
                handleChange={this.handleChange}
              />

              <div className="field is-horizontal has-addons">
                <div className="field-label is-normal">
                  <label className="label">Genital / Urinary</label>
                </div>
                <div className="field-body">
                  <Checkbox
                    field="trouble_urinating"
                    label="Trouble Urinating"
                    value={trouble_urinating}
                    handleChange={this.handleChange}
                  />
                  <Checkbox
                    field="abnormal_bleeding"
                    label="Abnormal Bleeding"
                    value={abnormal_bleeding}
                    handleChange={this.handleChange}
                  />
                  <Checkbox
                    field="vaginal_discharge"
                    label="Vaginal Discharge"
                    value={vaginal_discharge}
                    handleChange={this.handleChange}
                  />
                </div>
              </div>

              <Textarea
                field="genital_urinary_description"
                label="Genital / Urinary Details"
                value={genital_urinary_description}
                handleChange={this.handleChange}
              />

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Musculoskeletal</label>
                </div>
                <div className="field-body">
                  <Checkbox
                    field="joint_pain"
                    label="Joint Pain"
                    value={joint_pain}
                    handleChange={this.handleChange}
                  />
                  <Checkbox
                    field="joint_swelling"
                    label="Joint Swelling"
                    value={joint_swelling}
                    handleChange={this.handleChange}
                  />
                </div>
              </div>

              <Textarea
                field="musculoskeletal_details"
                label="Musculoskeletal Details"
                value={musculoskeletal_details}
                handleChange={this.handleChange}
              />
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    rosystem: state.encounter.selectedEncounter.rosystem,
    status: state.encounter.selectedEncounter.status
  };
};
const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(RoSystems);
