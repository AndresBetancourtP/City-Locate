import React from "react";

const Mensajes = (props) => {
  return (
    <>
      <div className="card bg-dark text-start p-3 my-2">
        <figure className="mb-0">
          <blockquote className="blockquote text-white">
            <p>{props.mensaje.content + ` ` + props.mensaje.date}</p>
          </blockquote>
          {props.mensaje.image && (
            <img
              className="p-2 m-2"
              src={props.mensaje.image}
              alt={"Escrito"}
              style={{ width: "100%", borderRadius: "20px" }}
            />
          )}
          <figcaption className="blockquote-footer mb-0 text-white">
            <cite title="Source Title">{props.mensaje.author.username}</cite>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export default Mensajes;
