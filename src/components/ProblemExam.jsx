import React from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Checkbox from "./Checkbox";
import Textarea from "./Textarea";
import DropdownSelect from "./DropdownSelect";

class ProblemExam extends React.Component {
  initialState = {
    appearance: "",
    constitutional_details: "",
    psychiatric_state: "",
    psychiatric_details: "",
    abdominal_tenderness: false,
    abdominal_details: "",
    mass_detected: false,
    mass_details: "",
    bowel_sounds: "",
    pelvic_external: "",
    pelvic_vaginal: "",
    pelvic_uteris: "",
    pelvic_ovaries: "",
    pelvic_bladder: "",
    pelvic_details: ""
  };

  state = { ...this.initialState };

  componentDidMount = () => {
    this.initialState = { ...this.props.problemExam };
    this.setState({ ...this.props.problemExam });
  };

  handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });

    fetch(
      `http://localhost:3000/api/v1/problem_exam/${this.props.problemExam.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          problem_exam: { ...this.state, [e.target.name]: value }
        })
      }
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response; //we only get here if there is no error
      })
      .then(res => res.json())
      .then(data => {
        this.props.updateEncounterChild("problem_exam", data);
        this.setState(data);
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  render() {
    let {
      appearance,
      constitutional_details,
      psychiatric_state,
      psychiatric_details,
      abdominal_tenderness,
      abdominal_details,
      mass_detected,
      bowel_sounds,
      pelvic_external,
      pelvic_vaginal,
      pelvic_uteris,
      pelvic_ovaries,
      pelvic_bladder,
      pelvic_details
    } = this.state;

    return (
      <section className="encounter-section section">
        <div className="container">
          <h2 className="subtitle">OB/GYN Problem Exam</h2>
          <form className="form">
            <div className="field is-horizontal has-addons">
              <div className="field-label is-normal">
                <label className="label">Constitutional</label>
              </div>

              <div className="field-body">
                <DropdownSelect
                  list={["healthy", "ill"]}
                  field="appearance"
                  label="Appearance"
                  value={appearance || ""}
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
                <DropdownSelect
                  list={[
                    "calm",
                    "depressed",
                    "anxious",
                    "agitated",
                    "disoriented"
                  ]}
                  field="psychiatric_state"
                  label="Psychiatric State"
                  value={psychiatric_state || ""}
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
                <label className="label">Abdominal</label>
              </div>
              <div className="field-body">
                <Checkbox
                  field="abdominal_tenderness"
                  label="Abdominal Tenderness"
                  value={abdominal_tenderness}
                  handleChange={this.handleChange}
                />

                <Checkbox
                  field="mass_detected"
                  label="Mass Detected"
                  value={mass_detected}
                  handleChange={this.handleChange}
                />

                <DropdownSelect
                  list={[
                    "normal_bowel",
                    "hyperactive_bowel",
                    "hypocative_bowel"
                  ]}
                  field="bowel_sounds"
                  label="Bowel Sounds"
                  value={bowel_sounds || ""}
                  handleChange={this.handleChange}
                />
              </div>
            </div>

            <Textarea
              field="abdominal_details"
              label="Abdominal Details"
              value={abdominal_details}
              handleChange={this.handleChange}
            />

            <div className="field is-horizontal has-addons">
              <div className="field-label is-normal">
                <label className="label">Pelvic</label>
              </div>
              <div className="field-body">
                <DropdownSelect
                  list={[
                    "normal_external",
                    "painful_external",
                    "inflamed_external",
                    "bleeding_external"
                  ]}
                  field="pelvic_external"
                  label="External"
                  value={pelvic_external || ""}
                  handleChange={this.handleChange}
                />

                <DropdownSelect
                  list={[
                    "normal_vaginal",
                    "painful_vaginal",
                    "inflamed_vaginal",
                    "bleeding_vaginal"
                  ]}
                  field="pelvic_vaginal"
                  label="Vaginal"
                  value={pelvic_vaginal || ""}
                  handleChange={this.handleChange}
                />

                <DropdownSelect
                  list={[
                    "normal_uteris",
                    "painful_uteris",
                    "inflamed_uteris",
                    "bleeding_uteris"
                  ]}
                  field="pelvic_uteris"
                  label="Uteris"
                  value={pelvic_uteris || ""}
                  handleChange={this.handleChange}
                />

                <DropdownSelect
                  list={[
                    "normal_ovaries",
                    "painful_ovaries",
                    "inflamed_ovaries",
                    "bleeding_ovaries"
                  ]}
                  field="pelvic_ovaries"
                  label="Ovaries"
                  value={pelvic_ovaries || ""}
                  handleChange={this.handleChange}
                />
                <DropdownSelect
                  list={[
                    "normal_bladder",
                    "painful_bladder",
                    "inflamed_bladder",
                    "bleeding_bladder"
                  ]}
                  field="pelvic_bladder"
                  label="Bladder"
                  value={pelvic_bladder || ""}
                  handleChange={this.handleChange}
                />
              </div>
            </div>

            <Textarea
              field="pelvic_details"
              label="Pelvic Details"
              value={pelvic_details}
              handleChange={this.handleChange}
            />
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { problemExam: state.encounter.selectedEncounter.problem_exam };
};

const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(ProblemExam);
