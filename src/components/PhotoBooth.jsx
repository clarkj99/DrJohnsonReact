import React, { Fragment, useReducer } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { connect } from "react-redux";
import { addLogin } from "../actions/rootActions";

class PhotoBooth extends React.Component {
  initialState = { currentPhoto: null, takingPhoto: false };
  state = { ...this.initialState };
  handlePhoto = dataUri => {
    console.log(dataUri);
    this.setState({ currentPhoto: dataUri });
  };

  handleKeep = () => {
    console.log("keeping it");
  };

  handleTrash = () => {
    this.setState({ ...this.initialState });
  };

  handleTakePhoto = () => {
    this.setState({ takingPhoto: true });
  };

  render() {
    return (
      <div className="columns">
        {this.state.takingPhoto && (
          <div className="column">
            <figure className="image">
              <Camera onTakePhoto={this.handlePhoto} />
            </figure>
          </div>
        )}
        <div className="column">
          <figure className="image is-4by3">
            <img
              className="avatar"
              src={this.state.currentPhoto || this.props.photo}
              alt="me"
            ></img>
          </figure>

          {this.state.currentPhoto && (
            <button className="button is-success is-fullwidth">
              <span className="icon">
                <i className="fas fa-thumbs-up"></i>
              </span>
              <span>Keep</span>
            </button>
          )}
          <div className="">
            {!this.state.takingPhoto && !this.state.currentPhoto ? (
              <button
                className="button is-link is-fullwidth"
                onClick={this.handleTakePhoto}
              >
                <span className="icon">
                  <i className="fas fa-camera"></i>
                </span>
                <span>Take a photo</span>
              </button>
            ) : (
              <button
                className="button is-danger is-fullwidth"
                onClick={this.handleTrash}
              >
                <span className="icon">
                  <i className="fas fa-ban"></i>
                </span>
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { photo: state.login.user.profile.photo };
};

export default connect(mapStateToProps)(PhotoBooth);
