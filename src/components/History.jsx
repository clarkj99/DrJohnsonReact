import React, { Fragment } from "react";
import { connect } from "react-redux";

import BackArrow from "./BackArrow";
import PatientBanner2 from "./PatientBanner2";
import Checkbox from "./Checkbox";
import { updatePatientHistory } from "../actions/rootActions";
import { fetchFunction } from "../utils";

class History extends React.Component {
  initialState = {
    pregnancy: false,
    hypertension: false,
    high_bp: false,
    cancer: false,
    breast_lump: false,
    heart_disease: false,
    abnormal_ekg: false,
    depression: false,
    diabetes1: false,
    diabetes2: false,
    infertility: false,
    mental_illness: false,
    post_menopausal_bleeding: false,
    seizures: false,
    migraines: false
  };

  state = { ...this.initialState };

  componentDidMount = () => {
    this.initialState = { ...this.props.history };
    this.setState({ ...this.props.history });
  };

  handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });

    fetchFunction(`history/${this.props.history.id}`, "PATCH", {
      history: { ...this.state, [e.target.name]: value }
    })
      .then(data => {
        this.props.updatePatientHistory(data);
        this.setState(data);
      })
      .catch(res => {
        this.setState({ error: res.message });
      });
  };

  render = () => {
    const {
      pregnancy,
      hypertension,
      high_bp,
      cancer,
      breast_lump,
      heart_disease,
      abnormal_ekg,
      depression,
      diabetes1,
      diabetes2,
      infertility,
      mental_illness,
      post_menopausal_bleeding,
      seizures,
      migraines
    } = this.state;

    return (
      <Fragment>
        <BackArrow />
        <section className="section">
          <div className="container">
            <h2 className="title">Patient History</h2>
            <PatientBanner2 />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <Checkbox
                  field="pregnancy"
                  label="Pregnancy"
                  value={pregnancy}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="hypertension"
                  label="Hypertension"
                  value={hypertension}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="high_bp"
                  label="High_bp"
                  value={high_bp}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="cancer"
                  label="cancer"
                  value={cancer}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="breast_lump"
                  label="Breast Lump"
                  value={breast_lump}
                  handleChange={this.handleChange}
                />
              </div>
              <div className="column">
                <Checkbox
                  field="heart_disease"
                  label="Heart Disease"
                  value={heart_disease}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="abnormal_ekg"
                  label="Abnormal Ekg"
                  value={abnormal_ekg}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="depression"
                  label="Depression"
                  value={depression}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="diabetes1"
                  label="Diabetes Type-1"
                  value={diabetes1}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="diabetes2"
                  label="Diabetes Type-2"
                  value={diabetes2}
                  handleChange={this.handleChange}
                />
              </div>
              <div className="column">
                <Checkbox
                  field="infertility"
                  label="Infertility"
                  value={infertility}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="mental_illness"
                  label="Mental Illness"
                  value={mental_illness}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="post_menopausal_bleeding"
                  label="Post-Menopausal Bleeding"
                  value={post_menopausal_bleeding}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="seizures"
                  label="Seizures"
                  value={seizures}
                  handleChange={this.handleChange}
                />
                <Checkbox
                  field="migraines"
                  label="Migraines"
                  value={migraines}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  };
}
const mapStateToProps = state => {
  return { history: state.user.selectedPatient.history };
};

const mapDispatchToProps = { updatePatientHistory };
export default connect(mapStateToProps, mapDispatchToProps)(History);
