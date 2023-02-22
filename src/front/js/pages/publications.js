import React, { useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";
import "../../styles/publications.css";
import car1 from "../../img/rigo-baby.jpg";

export const Publications = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchAnuncios = () => {
    fetch(process.env.BACKEND_URL + "/api/anuncios")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAnuncios(data);
      });
  };

  const fetchUsers = () => {
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
    fetchAnuncios();
    fetchUsers();
  }, []);

  const findUser = (userId) => {
    /* users.find(({ userid }, index) => {
      console.log("Visited index ", index, " with value ", value);  
    }); */
  };

  return (
    <div>
      {anuncios.length > 0 && (
        <div className="card gedf-card">
          <div className="card-header">
            <div className="col-12 col-sm-12 col-lg-12">
              <ul className="list-group">
                {anuncios.map((anuncio) => (
                  <ul key={anuncio.id} className="list-group-item">
                    <span className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="ml-2">
                        <div className="h5 m-0">{anuncio.id}</div>
                        <div className="h7 text-muted">Miracles Lee Cross</div>
                      </div>
                      <img
                        src={anuncio.image}
                        width="100"
                        height="100"
                        className="img-reponsive img-rounded"
                        onError={(e) => (e.target.src = car1)}
                      />
                      <ul>{anuncio.content}</ul>
                      <ul>{anuncio.marca}</ul>
                      <ul>
                        <i className="fa fa-clock-o"></i>
                        {` ${anuncio.date}`}
                      </ul>
                    </span>
                    <div className="card-footer">
                      <a href="#" className="card-link">
                        <i className="fa fa-gittip"></i> Like
                      </a>
                      <a href="#" className="card-link">
                        <i className="fa fa-comment"></i> Comment
                      </a>
                      <a href="#" className="card-link">
                        <i className="fa fa-mail-forward"></i> Share
                      </a>
                    </div>
                  </ul>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
