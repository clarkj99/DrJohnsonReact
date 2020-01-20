import React from "react";
import { Link } from "react-router-dom";

const BackArrow = props => {
  return (
    <nav className="navbar">
      <Link className="navbar-item" to="/providers">
        <span className="icon">
          <i className="fas fa-long-arrow-alt-left"></i>
        </span>
        <span>Providers</span>
      </Link>
    </nav>
  );
};

export default BackArrow;
