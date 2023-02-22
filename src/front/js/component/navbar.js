import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">AUTO4U</span>
        </Link>
        <div className="ml-auto">
          <Link to="/log">
            <button className="btn btn-light ">Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
