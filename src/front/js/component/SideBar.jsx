import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../service/auth.service";

const SideBar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
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
      {currentUser && (
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
      )}
    </>
  );
};

export default SideBar;
