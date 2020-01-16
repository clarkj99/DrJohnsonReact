import React, { Fragment } from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";

class Intake extends React.Component {
  initialState = {
    complaint: "",
    appointment_at: "",
    checkin_at: "",
    weight: "",
    height: "",
    bp_systolic: "",
    bp_diastolic: ""
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

    fetch(`http://localhost:3000/api/v1/intake/${this.props.intake.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        intake: { ...this.state, [e.target.name]: value }
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
        this.props.updateEncounterChild("intake", data);
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  render() {
    return (
      <section className="encounter-section section">
        <div className="container">
          <h2 className="subtitle">Intake</h2>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { intake: state.encounter.selectedEncounter.intake };
};
const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(Intake);
