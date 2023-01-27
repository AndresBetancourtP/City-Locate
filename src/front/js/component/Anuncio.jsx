import React from "react";
const anuncio = (props) => {
  return (
    <>
      <div className="card bg-primary text-start p-3 my-2">
        <figure className="mb-0">
          <blockquote className="blockquote text-white">
            <p>{props.anuncio.content + ` ` + props.anuncio.date}</p>
          </blockquote>
          {props.anuncio.image && (
            <img
              className="p-2 m-2"
              src={props.anuncio.image}
              alt={"-anuncio"}
              style={{ width: "100%", borderRadius: "20px" }}
            />
          )}
          <figcaption className="blockquote-footer mb-0 text-white">
            <cite title="Source Title">{props.anuncio.author.username}</cite>
          </figcaption>
        </figure>
      </div>
    </>
  );
};
export default anuncio;