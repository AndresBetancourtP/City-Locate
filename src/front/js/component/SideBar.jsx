import React from "react";

const SideBar = () => {
  return (
    <>
      {/* boton del home */}
      <div className="text-center">
        <button className="btn btn-dark btn-sm mt-2" role="button">
          <span className="text-white d-flex flex-row">
            Home
            <i className="fa-solid fa-house my-auto mx-4"></i>
          </span>
        </button>
      </div>
      {/* boton del perfil */}
      <div className="text-center">
        <button className="btn btn-dark btn-sm mt-2" role="button">
          <span className="text-white d-flex flex-row">
            Profile
            <i className="fa-solid fa-user my-auto mx-4"></i>
          </span>
        </button>
      </div>
      {/* boton de vender vehiculos */}
      <div className="text-center">
        <button className="btn btn-dark btn-sm mt-2 rounded-pill" role="button">
          <span className="text-white d-flex flex-row">
            Ventas de vehiculos
          </span>
        </button>
      </div>
    </>
  );
};

export default SideBar;
