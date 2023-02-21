import React, { useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";
import "../../styles/publications.css";
import car1 from "../../img/rigo-baby.jpg";

export const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch(process.env.BACKEND_URL + "/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-lg-12">
            <h6 className="text-muted">List Group with Images "users"</h6>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="image-parent">
                  <img src={car1} className="img-fluid" alt="quixote"></img>
                </div>
                Don Quixote
              </li>
            </ul>
          </div>
        </div>
      </div>

      {users.length > 0 && (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              <p>
                {user.username}{" "}
                <span style={{ marginLeft: "1em" }}>{user.email}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
