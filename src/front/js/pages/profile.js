import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";

import { useParams } from "react-router-dom";
import SideBar from "../component/SideBar.jsx";

const Profile = () => {
  const { username } = useParams();
  const { store, actions } = useContext(Context);

  const [user, setUser] = useState([]);

  const fetchData = () => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch(process.env.BACKEND_URL + "/api/user/test1")
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
          <h3>Perfil de Usuario</h3>

          <h1>{"@" + user.username}</h1>
          <p>Nombre de Usuario: {user.username}</p>
          <p>Email de Usuario: {user.email}</p>
          <p>Perfil de Usuario: {user.profile_name}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
