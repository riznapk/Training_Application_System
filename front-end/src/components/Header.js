import React from "react";
import "../styles/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header">
      {/* Header logo */}
      {/* <img className="header-logo" src={logo} alt="skill boost header Logo" /> */}
      <Link to="/" className="no-link">
        <span>Skill boost</span>
      </Link>

      {/* Adding search-icon */}
      <div className="header-search">
        <input type="text" className="header-searchInput"></input>
        <SearchIcon className="header-searchIcon" />
      </div>

      <div className="header-nav">
        <div className="header-user">
          <Link to="/userDetails" className="header-user">
            <AccountCircleIcon fontSize="large" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
