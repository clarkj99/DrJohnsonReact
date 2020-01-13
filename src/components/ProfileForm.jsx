import React, { Fragment } from "react";
import { connect } from "react-redux";

class ProfileForm extends React.Component {
  initalState = {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    photo: null
  };

  componentDidMount = () => {
    this.initalState = { ...this.props.user.profile };
    this.setState({ ...this.props.user.profile });
  };

  state = { ...this.initalState };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = e => {
    if (e.target.files[0])
      this.setState({ [e.target.name]: e.target.files[0] });
  };

  handleSubmit = e => {
    fetch("http://localhost:3000/api/v1/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        profile: this.state
      })
    })
      .then(res => res.json())
      .then(console.log);
  };

  render() {
    let profile = this.state;
    return (
      <Fragment>
        <h2 className="title">Edit Profile</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                name="address1"
                className="input"
                type="text"
                placeholder="Street address"
                value={profile.address1}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                name="address2"
                className="input"
                type="text"
                placeholder="Address 2"
                value={profile.address2}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                name="city"
                className="input"
                type="text"
                placeholder="City"
                value={profile.city}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                name="state"
                className="input"
                type="text"
                placeholder="State"
                value={profile.state}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                name="zip"
                className="input"
                type="text"
                placeholder="Zip"
                value={profile.zip}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <div className="file has-name">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="newPhoto"
                    accept="image/png, image/jpeg"
                    onChange={this.handleImageChange}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Add a photo</span>
                  </span>
                  {profile.newPhoto && (
                    <span className="file-name">{profile.newPhoto.name}</span>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="field">
            <button className="button">Submit</button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.login.user };
};
export default connect(mapStateToProps)(ProfileForm);
