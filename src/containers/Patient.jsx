import React, { Fragment } from "react";
import { connect } from "react-redux";
import Hero from "../components/Hero";

const Patient = () => {
  return (
    <Fragment>
      <Hero title="Patient Portal" />
      <section className="section"></section>
    </Fragment>
  );
};
export default connect()(Patient);
