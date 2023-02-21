const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      publicacion: [],
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MzY0ODcxMiwianRpIjoiNmI2ZWY0MjItODI1NS00Y2NkLTg3MTUtNDIyODI4ZmUwMTYyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InNhbXVlbGljIiwibmJmIjoxNjczNjQ4NzEyLCJleHAiOjE2NzM2NDk2MTJ9.9lXAA4AYSXT9fcdkMmia79kp1flkNfRKqGFhrFUlLK8",
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Usar getActions para llamar a una funcion dentro de una funcion
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // Se obtienen datos del backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");

          const data = await resp.json();

          setStore({ message: data.message });
          // Debes devolver algo para poder resolver el asincrono
          return data;
        } catch (error) {
          console.log(
            "Ocurrio un error al cargar mensaje desde el backend",
            error
          );
        }
      },

      getFeed: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/anuncio");
          const data = await resp.json();

          setStore({ publicacion: data });
        } catch (err) {
          console.log(err);
        }
      },

      getProfile: async () => {
        console.log("Vamos a repasar todo");
      },
      changeColor: (index, color) => {
        //Obtienes desde el Store
        const store = getStore();

        //Hay que recorrer toda la matriz de demostracion para obtener el index
        //Cambia su color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //Restablecer todo el Store
        setStore({ demo: demo });
      },

      postTexto: async (texto, url, marca) => {
        const store = getStore();

        let response = await fetch(process.env.BACKEND_URL + "/api/anuncio", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //Authorization: "Bearer " + store.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            content: texto,
            author_id: 1, //arreglar
            image: url,
            marca: marca,
          }), // body data type must match "Content-Type" header
        });
        let data = await response.text();
        console.log(data);
        if (data === "Ese anuncio no tiene información") {
          alert("Favor agregar un texto");
          return;
        }
        if (data === "Favor agregar una imagen") {
          alert("Favor seleccionar una imagen");
          return;
        }
        if (data === "Favor agregar la marca del vehiculo") {
          alert("Favor agregar la marca del vehiculo");
          return;
        }
        if (data) {
          alert("Anuncio publicado satisfactoriamente");
          setStore({ publicacion: [data, ...store.publicacion] });
        }
      },
    },
  };
};

export default getState;
