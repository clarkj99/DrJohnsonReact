import React from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Textarea from "./Textarea";
import moment from "moment";

class Intake extends React.Component {
  initialState = {
    complaint: "",
    appointment_at: "",
    checkin_at: new Date(),
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
    let value;
    switch (e.target.type) {
      case "checkbox":
        value = e.target.checked;
        break;
      case "datetime-local":
        value = moment(e.target.value).toString();
        break;
      default:
        value = e.target.value;
    }
    console.log(value);
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
        this.setState(data);
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  StringField = props => {
    return (
      <div className="field is-horizontal has-addons">
        <div className="field-label  is-normal">
          <label className="label" htmlFor={props.field}>
            {props.label}
          </label>
        </div>

        <div className="field-body">
          <div className="control">
            <input
              className="input"
              name={props.field}
              type="text"
              placeholder={props.label}
              value={props.value || ""}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  DateTime = props => {
    return (
      <div className="field is-horizontal has-addons">
        <div className="field-label  is-normal">
          <label className="label" htmlFor={props.field}>
            {props.label}
          </label>
        </div>

        <div className="field-body">
          <div className="control">
            <input
              className="input"
              name={props.field}
              type="datetime-local"
              value={moment(props.value || new Date()).format(
                moment.HTML5_FMT.DATETIME_LOCAL
              )}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    let {
      complaint,
      appointment_at,
      checkin_at,
      weight,
      height,
      bp_systolic,
      bp_diastolic
    } = this.props.intake;

    return (
      <section className="encounter-section section">
        <div className="container">
          <h2 className="subtitle">Intake</h2>

          <this.DateTime
            field="appointment_at"
            label="Appointment Time"
            value={appointment_at}
          />

          <this.DateTime
            field="checkin_at"
            label="Checkin Time"
            value={checkin_at}
          />
          <Textarea
            field="complaint"
            label="Chief Complaint"
            value={complaint}
            handleChange={this.handleChange}
          />

          <this.StringField
            field="weight"
            label="Weight (lbs)"
            value={weight}
          />
          <this.StringField
            field="height"
            label="Height (ins)"
            value={height}
          />

          <div className="field is-horizontal has-addons">
            <div className="field-label  is-normal">
              <label className="label">Blood Pressure</label>
            </div>

            <div className="field-body ">
              <div className="control">
                <input
                  className="input"
                  name="bp_systolic"
                  type="text"
                  placeholder="Systolic"
                  value={bp_systolic || ""}
                  onChange={this.handleChange}
                />
              </div>
              <p className="control">
                <span className="button is-static"> /</span>
              </p>
              <div className="control">
                <input
                  className="input"
                  name="bp_diastolic"
                  type="text"
                  placeholder="Diastolic"
                  value={bp_diastolic || ""}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
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
