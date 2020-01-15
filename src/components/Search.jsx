import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addUsers, selectUser } from "../actions/rootActions";

class Search extends React.Component {
  state = { searchTerm: "" };

  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response; //we only get here if there is no error
      })
      .then(res => res.json())
      .then(data => {
        this.props.addUsers("patients", data);
      })
      .catch(res => {});
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchResults = () => {
    if (this.state.searchTerm.length >= 1)
      return this.props.patients.filter(patient => {
        return `${patient.last_name}+${patient.first_name}`
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase());
      });
    else return [];
  };

  handleClick = user => {
    this.props.selectUser(user);
  };

  SearchResult = props => {
    return (
      <div className="box" onClick={e => this.handleClick(props.user)}>
        {props.user.last_name}, {props.user.first_name} <br />
        {props.user.profile.address1}
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <h2 className="title">Search</h2>
        <div className="field">
          <div className="control has-icons-left">
            <span className="icon is-small is-left">
              <i className="fas fa-search"></i>
            </span>

            <input
              className="input"
              name="searchTerm"
              type="search"
              placeholder="name"
              value={this.state.seartTerm}
              onChange={this.handleChange}
              autoComplete="off"
            ></input>
          </div>
        </div>
        <div className="">
          {this.searchResults().length > 0 ? (
            <div className=" search-results">
              {this.searchResults().map(user => (
                <this.SearchResult key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div>
              <p className="message">Search for patients by name</p>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { patients: state.user.patients };
};

const mapDispatchToProps = { addUsers, selectUser };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
