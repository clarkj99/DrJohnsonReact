import React from "react";

const Textarea = props => {
  return (
    <div className="field is-horizontal has-addons">
      <div className="field-label  is-normal">
        <label className="label" htmlFor={props.field}>
          {props.label}
        </label>
      </div>
      <div className="field-body">
        <div className="control is-expanded">
          <textarea
            className="textarea"
            type="text"
            placeholder={props.label}
            name={props.field}
            value={props.value || ""}
            onChange={props.handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Textarea;
