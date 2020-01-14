import React from "react";
import { connect } from "react-redux";

class RoSystems extends React.Component {
  state = {};
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
          <form className="form"></form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { rosystem: state.encounter.selectedEncounter.rosystem };
};

export default connect(mapStateToProps)(RoSystems);
