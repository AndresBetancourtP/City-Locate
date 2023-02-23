import React from "react";

const Search = () => {
  return (
    <>
      <div className="d-flex flex-column text-center px-4">
        <div className="input-group my-3 bg-light ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Busca tu modelo favorito"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        {/* Modelos de carro la cual se le agregara un link a cada uno 
        <div className="">
          <h4>Modelo de carro 🚗✨</h4>

          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-light text-start">
                Chevrolet
              </li>
              <li className="list-group-item bg-light text-start">
                Ford
              </li>
              <li className="list-group-item bg-light text-start">
                Fiat
                </li>
              <li className="list-group-item bg-light text-start">
                Jeep
                </li>
              <li className="list-group-item bg-light text-start">
                Toyota
              </li>
              <li className="list-group-item bg-light text-start">
                Nissan
              </li>
              <li className="list-group-item bg-light text-start">
                Volkswagen
              </li>
            </ul>
          </div>
        </div>*/}
      </div>
    </>
  );
};

export default Search;
