import React from "react";
import { fetchFunction } from "../utils";

class ProviderSelect extends React.Component {
  state = { physicians: [] };
  componentDidMount = () => {
    fetchFunction("users?role=physician", "GET", null).then(response =>
      this.setState({ physicians: response })
    );
  };

  render() {
    return (
      <div className="select">
        <select value={this.props.value} onChange={this.props.onChange}>
          <option value=""> Choose a Provider</option>
          {this.state.physicians.map(physician => (
            <option key={physician.id} value={physician.id}>
              {physician.last_name}, {physician.first_name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ProviderSelect;
