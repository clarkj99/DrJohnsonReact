import React from "react";
import { connect } from "react-redux";
import { updateEncounterChild } from "../actions/rootActions";
import Textarea from "./Textarea";
import moment from "moment";
import { fetchFunction } from "../utils";

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
    let value;
    switch (e.target.type) {
      case "checkbox":
        value = e.target.checked;
        break;
      case "datetime-local":
        value = moment(
          e.target.value,
          moment.HTML5_FMT.DATETIME_LOCAL
        ).format();
        break;
      default:
        value = e.target.value;
    }

    fetchFunction(`intake/${this.props.intake.id}`, "PATCH", {
      intake: { ...this.state, [e.target.name]: value }
    })
      .then(data => {
        this.props.updateEncounterChild("intake", data);
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
    this.setState({ ...this.state, [e.target.name]: value });
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
              value={moment(props.value).format(
                moment.HTML5_FMT.DATETIME_LOCAL
              )}
              onChange={this.handleChange}
            />
          </div>
          {/* Set the time to current time if you want  */}
          <div className="control">
            <button
              className="button is-link"
              onClick={() =>
                this.handleChange({
                  target: {
                    name: props.field,
                    type: "datetime-local",
                    value: moment(new Date()).format(
                      moment.HTML5_FMT.DATETIME_LOCAL
                    )
                  }
                })
              }
            >
              <span className="icon is-small">
                <i className="fas fa-clock"></i>
              </span>
              <span>now</span>
            </button>
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
    } = this.state;

    return (
      <section className="encounter-section section">
        <div className="container">
          <h2 className="subtitle">Intake</h2>
          <fieldset disabled={this.props.status !== "open"}>
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
          </fieldset>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    intake: state.encounter.selectedEncounter.intake,
    status: state.encounter.selectedEncounter.status
  };
};
const mapDispatchToProps = { updateEncounterChild };
export default connect(mapStateToProps, mapDispatchToProps)(Intake);
