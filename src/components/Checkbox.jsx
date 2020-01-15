import React from "react";

const Checkbox = props => {
  return (
    <div className="field">
      <div className="control">
        <input
          id={props.field}
          className="switch is-link"
          type="checkbox"
          name={props.field}
          checked={props.value ? "checked" : ""}
          onChange={props.handleChange}
        />
        <label htmlFor={props.field}>{props.label}</label>
      </div>
    </div>
  );
};

export default Checkbox;
