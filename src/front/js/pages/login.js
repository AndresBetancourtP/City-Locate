import React, { Component } from "react";

export const Login = () => {
    return (
      <div className="container row ">
        <div className="card col-4">
          <div className="card-body">
            <h5 className="card-title h5"> Email </h5>
            <div class="input-group mb-3">
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="enter your email"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
            <h5 class="card-title h5"> Password </h5>
            <input
              id="password"
              type="text"
              class="form-control"
              placeholder="Enter your password"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            ></input>
            <a href="/" className="btn btn-primary">
              {" "}
              Registrarse
            </a>
          </div>
          <p>
            {" "}
            Si no tienes una cuenta, <a href="/"> Registrate. </a>
          </p>
        </div>
      </div>
    );
  };