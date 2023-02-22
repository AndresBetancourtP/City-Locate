import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";

import { useParams } from "react-router-dom";

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
    <>
      <h1>Profile {username}</h1>
      <p>Nombre de Usuario: {user.username}</p>
      <p>Email de Usuario: {user.email}</p>
      <p>Perfil de Usuario: {user.profile_name}</p>
    </>
  );
};

export default Profile;
