import React from "react";

const Hero = props => {
  return (
    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{props.title}</h1>
          <h2 className="subtitle">
            The Best Micro EMR Built in January 2020!
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;
