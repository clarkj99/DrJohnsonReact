import React from "react";
import { connect } from "react-redux";

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
    this.initialState = { ...this.props.hpi };
    this.setState({ ...this.props.hpi });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    fetch(`http://localhost:3000/api/v1/rosystem/${this.props.rosystem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        rosystem: { ...this.state, [e.target.name]: e.target.value }
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
