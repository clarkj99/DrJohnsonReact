import React from "react";

const Icon = props => {
  return (
    <span className="icon">
      <i className={`fas fa-${props.icon}`}></i>
    </span>
  );
};

export default Icon;
