import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const Publicar = () => {
  const { store, actions } = useContext(Context);
  const [texto, setTexto] = useState();
  const [marca, setMarca] = useState();
  const [image, setImage] = useState();
  const [file, setFile] = useState();

  const postTexto = async () => {
    actions.postTexto(texto, image, marca);
    setTexto("");
  };

  const uploadImage = async () => {
    const urlCloudinary =
      "https://api.cloudinary.com/v1_1/dzmv2j15r/image/upload";

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "auivwfcz");

    try {
      let resp = await fetch(urlCloudinary, {
        method: "POST",
        body: formData,
      });

      let data = await resp.json();
      setImage(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const loadImage = (evento) => {
    setFile(evento[0]);
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label">✔Publica aca tu carro✔</label>
        {image && <img style={{ width: "150px" }} src={image} alt="img" />}
        <textarea
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <input
          value={marca || ""}
          onChange={(event) => setMarca(event.target.value)}
          className="form-control"
          id="exampleFormControlInput1"
          type="text"
        ></input>
        <div className="d-flex flex-row justify-content-end">
          <input
            onChange={(event) => loadImage(event.target.files)}
            type="file"
            name="imagen"
            accept="image/*"
          />
          <span className="text-info d-flex flex-row" onClick={uploadImage}>
            <i className="fa-solid fa-image my-auto mx-4"></i>
          </span>
          <button className="btn btn-dark m-1 " onClick={postTexto}>
            Publicar carro
          </button>
        </div>
      </div>
    </>
  );
};

export default Publicar;
