import React, { Fragment } from "react";
import { connect } from "react-redux";

const EncounterDetail = props => {
  const { selectedEncounter } = props;
  const { intake, hpi, rosystem, problem_exam, diagnosis } = selectedEncounter;
  return (
    <Fragment>
      <h2 className="title">Details</h2>
      <div className="columns">
        <div className="column">
          <table className="table">
            <tbody>
              <tr>
                <th>Checkin</th>
                <td>{intake.checkin_at}</td>
              </tr>
              <tr>
                <th>Chief Complaint</th>
                <td>{intake.complaint}</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{intake.height}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{intake.weight}</td>
              </tr>
              <tr>
                <th>Blood Pressure</th>
                <td>
                  {intake.bp_systolic} / {intake.bp_diastolic}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr>
                <th>Constitutional</th>
                <td>
                  {rosystem.fever && "[Fever]"}{" "}
                  {rosystem.fatigue && "[Fatigue]"}{" "}
                  {rosystem.appetite && "[Appetite]"}{" "}
                  {rosystem.weight && "[Weight]"}
                </td>
                <td>{rosystem.constitutional_details}</td>
              </tr>
              <tr>
                <th>Psychiatric</th>
                <td>
                  {rosystem.depression && "[Depression]"}{" "}
                  {rosystem.anxiety && "[Anxiety]"}
                </td>
                <td>{rosystem.psychiatric_details}</td>
              </tr>
              <tr>
                <th>Gastro-Intestinal</th>
                <td>
                  {rosystem.trouble_swallowing && "[trouble_swallowing]"}{" "}
                  {rosystem.heartburn && "[heartburn]"}{" "}
                  {rosystem.nausea && "[nausea]"}{" "}
                  {rosystem.vomiting && "[vomiting]"}{" "}
                  {rosystem.irregular_bm && "[irregular_bm]"}
                </td>
                <td>{rosystem.gastrointestinal_details}</td>
              </tr>
              <tr>
                <th>Genital / Urinary</th>
                <td>
                  {rosystem.trouble_urinating && "[trouble_urinating]"}{" "}
                  {rosystem.abnormal_bleeding && "[abnormal_bleeding]"}{" "}
                  {rosystem.vaginal_discharge && "[vaginal_discharge]"}{" "}
                </td>
                <td>{rosystem.genital_urinary_description}</td>
              </tr>
              <tr>
                <th>Musculoskeletal Details</th>
                <td>
                  {rosystem.joint_pain && "[joint_pain]"}{" "}
                  {rosystem.joint_swelling && "[joint_swelling]"}{" "}
                </td>
                <td>{rosystem.musculoskeletal_details}</td>
              </tr>
            </tbody>
          </table>
        </div>{" "}
        <div className="column">
          <table className="table">
            <tbody>
              <tr>
                <th>Duration</th>
                <td>
                  {hpi.duration} {hpi.duration_units}
                </td>
              </tr>
              <tr>
                <th>Severity</th>
                <td>{hpi.severity} / 10</td>
              </tr>
              <tr>
                <th>Aggravating Factors</th>
                <td>{hpi.aggravating_factors}</td>
              </tr>
              <tr>
                <th>Context</th>
                <td>{hpi.context}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{hpi.location}</td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <tbody>
              <tr>
                <th>Orders</th>
                <td>{diagnosis.orders}</td>
              </tr>
              <tr>
                <th>Follow-Up</th>
                <td>{diagnosis.follow_up}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    selectedEncounter: state.encounter.selectedEncounter
  };
};

export default connect(mapStateToProps)(EncounterDetail);
