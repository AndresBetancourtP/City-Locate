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
          <div className="alert alert-info"></div>
          <div class="card gedf-card">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="mr-2">
                    <img
                      class="rounded-circle"
                      width="45"
                      src="https://picsum.photos/50/50"
                      alt=""
                    ></img>
                  </div>
                  <div class="ml-2">
                    <div class="h5 m-0">@LeeCross</div>
                    <div class="h7 text-muted">Miracles Lee Cross</div>
                  </div>
                </div>
                <div>
                  <div class="dropdown">
                    <button
                      class="btn btn-link dropdown-toggle"
                      type="button"
                      id="gedf-drop1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fa fa-ellipsis-h"></i>
                    </button>
                    <div
                      class="dropdown-menu dropdown-menu-right"
                      aria-labelledby="gedf-drop1"
                    >
                      <div class="h6 dropdown-header">Configuration</div>
                      <a class="dropdown-item" href="#">
                        Save
                      </a>
                      <a class="dropdown-item" href="#">
                        Hide
                      </a>
                      <a class="dropdown-item" href="#">
                        Report
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="text-muted h7 mb-2">
                {" "}
                <i class="fa fa-clock-o"></i> 10 min ago
              </div>
              <a class="card-link" href="#">
                <h5 class="card-title">
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  consectetur deserunt illo esse distinctio.
                </h5>
              </a>

              <p class="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                omnis nihil, aliquam est, voluptates officiis iure soluta alias
                vel odit, placeat reiciendis ut libero! Quas aliquid natus
                cumque quae repellendus. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ipsa, excepturi. Doloremque, reprehenderit!
                Quos in maiores, soluta doloremque molestiae reiciendis libero
                expedita assumenda fuga quae. Consectetur id molestias itaque
                facere? Hic!
              </p>
              <div>
                <span class="badge badge-primary">JavaScript</span>
                <span class="badge badge-primary">Android</span>
                <span class="badge badge-primary">PHP</span>
                <span class="badge badge-primary">Node.js</span>
                <span class="badge badge-primary">Ruby</span>
                <span class="badge badge-primary">Paython</span>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="card-link">
                <i class="fa fa-gittip"></i> Like
              </a>
              <a href="#" class="card-link">
                <i class="fa fa-comment"></i> Comment
              </a>
              <a href="#" class="card-link">
                <i class="fa fa-mail-forward"></i> Share
              </a>
            </div>
          </div>
        </div>
        <div className="col-4">
          <Search />
        </div>
      </div>
    </div>
  );
};
