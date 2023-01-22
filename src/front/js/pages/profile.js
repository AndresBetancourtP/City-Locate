import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";

import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const { store, actions } = useContext(Context);

  return (
    <>
      <h1>Profile {username}</h1>
    </>
  );
};

export default Profile;