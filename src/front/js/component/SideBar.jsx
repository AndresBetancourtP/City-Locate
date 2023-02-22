import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      {/* boton del home */}
      <div className="text-center">
        <Link to="/">
          <button className="btn btn-dark btn-sm mt-2" role="button">
            <span className="text-white d-flex flex-row">
              Home
              <i className="fa-solid fa-user my-auto mx-4"></i>
            </span>
          </button>
        </Link>
      </div>
      {/* boton del perfil */}
      <div className="text-center">
        <Link to="/profile">
          <button className="btn btn-dark btn-sm mt-2" role="button">
            <span className="text-white d-flex flex-row">
              Profile
              <i className="fa-solid fa-user my-auto mx-4"></i>
            </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default SideBar;
