import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/log.css";

export const Log = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [tostadaError, settostadaError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      email: "test1@test.com",
      password: "test1234",
    },
    {
      username: "test2@test.com",
      password: "test1234",
    },
  ];

  useEffect(() => {
    console.log("form submited");
    if (isSubmitted) {
      navigate("/");
    }
  }, [isSubmitted]);

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z0-9]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and numbers, and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    let formResult = handleValidation();
    console.log(formResult);
    const userData = database.find((user) => user.email === email);
    // Compare user info

    if (!userData) {
      settostadaError("Correo invalido");
      return;
    } else {
      settostadaError("");
    }

    if (userData.password !== password) {
      // Invalid password
      settostadaError("Credenciales Incorrectas");
      return;
    } else {
      settostadaError("");
    }
    setIsSubmitted(true);
    e.target.reset();
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <form id="loginform" onSubmit={loginSubmit}>
            <div className="form-group">
              <ul></ul>
              <label>Email address</label>
              <input
                type="email"
                autoComplete="off"
                className="form-control"
                id="EmailInput"
                name="EmailInput"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <small id="emailHelp" className="text-danger form-text">
                {emailError}
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                autoComplete="off"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>
            <p id="formerror" className="text-danger form-text">
              {tostadaError}
            </p>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
