import React from "react";

const DropdownSelect = props => {
  return (
    <div className="control is-expanded">
      <div className="select">
        <select
          name={props.field}
          value={props.value}
          onChange={props.handleChange}
        >
          <option value="">{props.label}</option>
          {props.list.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownSelect;
