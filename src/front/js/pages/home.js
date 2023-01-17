import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
		  <h1>Esta será la página principal</h1>
		  <p>
			<img src={rigoImageUrl} />
		  </p>
		  <div className="alert alert-info">
			{store.message || "Buscando nuevos anuncios..."}
		  </div>
		  <p>
			This boilerplate comes with lots of documentation:{" "}
			<a href="https://start.4geeksacademy.com/starters/react-flask">
			  Read documentation
			</a>
		  </p>
		</div>
	  );
	};