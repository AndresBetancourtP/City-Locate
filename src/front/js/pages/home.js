import React, { useContext } from "react";

import Mensajes from "../component/Mensajes.jsx";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import Publicar from "../component/Publicar.jsx";
import SideBar from "../component/SideBar.jsx";
import Search from "../component/Search.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="">
      <div className="row">
        <div className="col-2 d-flex flex-column">
          <SideBar />
        </div>
        {/* Feed */}
        <div className="col-6 py-3">
          <h3>Los mejores precios del mercado en vehiculos</h3>
          <Publicar />
          <div className="alert alert-info">
            {store.texto &&
              store.texto.map((escrito, index) => {
                return <Mensajes key={index} tweet={escrito} />;
              })}
          </div>
        </div>
        <div className="col-4">
          <Search />
        </div>
      </div>
    </div>
  );
};
