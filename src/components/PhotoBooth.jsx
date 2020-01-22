import React from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import unknownUser from "../images/unknown-user3.png";

class PhotoBooth extends React.Component {
  initialState = { currentPhoto: null, takingPhoto: false };
  state = { ...this.initialState };

  componentDidMount = () => {
    this.setState({ originalPhoto: this.props.photo || unknownUser });
  };

  handlePhoto = dataUri => {
    this.setState({ currentPhoto: dataUri });
  };

  handleKeep = () => {
    this.setState({
      ...this.initialState,
      originalPhoto: this.state.currentPhoto
    });

    const formData = new FormData();
    formData.append("photo", this.state.currentPhoto);

    fetch(`http://localhost:3000/api/v1/photo/${this.props.profile.id}`, {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log("camera", data);
        if (!data.error) this.props.updateProfile(data);
      });
  };

  handleTrash = () => {
    this.setState({ ...this.state, ...this.initialState });
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
              <Camera onTakePhoto={this.handlePhoto} isImageMirror={false} />
            </figure>
          </div>
        )}
        <div className="column">
          <figure className="image avatar is-4by3">
            <img
              className=""
              src={this.state.currentPhoto || this.props.photo}
              alt="me"
            ></img>
          </figure>

          {this.state.currentPhoto && (
            <button
              className="button is-success is-fullwidth"
              onClick={this.handleKeep}
            >
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

export default PhotoBooth;
