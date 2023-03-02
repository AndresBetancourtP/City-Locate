import React, { useState, useEffect, useContext } from "react";

import AuthService from "../service/auth.service";

import { Context } from "../store/appContext";
import Publicar from "../component/Publicar.jsx";

import { useParams } from "react-router-dom";
import SideBar from "../component/SideBar.jsx";

const Profile = () => {
  const { username } = useParams();
  const { store, actions } = useContext(Context);

  const [user, setUser] = useState([]);

  const test = AuthService.getCurrentUser(test);
  console.log(test);
  const headers = {
    Authorization: `Bearer ${test.token}`,
  }; // auth header with bearer token

  const fetchData = () => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch(process.env.BACKEND_URL + `/api/user/${test.user}`, { headers })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="row">
        <div className="col-2 d-flex flex-column">
          <SideBar />
        </div>
        <div className="col-6 py-3">
          <Publicar />
          <h3>Perfil de Usuario</h3>

          <h1>{"@" + user.username}</h1>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Nombre de Usuario: {user.username}
            </li>
            <li className="list-group-item">Email de Usuario: {user.email}</li>
            <li className="list-group-item">
              Perfil de Usuario: {user.profile_name}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
