import React from "react";
import DrJohnson from "../images/DrJohnson-black.png";

const Hero = props => {
  return (
    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="hero-image  column is-one-third">
              <figure className="home-logo image">
                <img src={DrJohnson} alt="DrJohnson" />
              </figure>
            </div>
            <div className="hero-content column content is-two-thirds">
              <h1 className="title">{props.title}</h1>
              <h2 className="subtitle">
                The Best Micro EMR Built in January 2020!
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
