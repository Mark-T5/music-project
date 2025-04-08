import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/" className="nav-link-button">Home</Link></li>
        <li><Link to="/artist" className="nav-link-button">Artists</Link></li>
        <li><Link to="/songs" className="nav-link-button">Songs</Link></li>
        <li><Link to="/albums" className="nav-link-button">Albums</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
