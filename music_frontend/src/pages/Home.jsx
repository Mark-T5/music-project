import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-container centered-content">
      <h1>Welcome to the Music!</h1>
      <p>Manage your artists, songs, and albums.</p>
      <div className="nav-links">
      <Link to="/artist" className="nav-link-button">Artists</Link>
      <Link to="/songs" className="nav-link-button">Songs</Link>
      <Link to="/albums" className="nav-link-button">Albums</Link>

      </div>
    </div>
  );
};

export default Home;
