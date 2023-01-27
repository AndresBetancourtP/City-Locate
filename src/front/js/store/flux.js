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
		  // Use getActions to call a function within a fuction
		  exampleFunction: () => {
			getActions().changeColor(0, "green");
		  },

		  getMessage: async () => {
			try {
			  // fetching data from the backend
			  const resp = await fetch(process.env.BACKEND_URL + "/api/hello");

			  const data = await resp.json();

			  setStore({ message: data.message });
			  // don't forget to return something, that is how the async resolves
			  return data;
			} catch (error) {
			  console.log("Error loading message from backend", error);
			}
		  },
		  changeColor: (index, color) => {
			//get the store
			const store = getStore();
	
			//we have to loop the entire demo array to look for the respective index
			//and change its color
			const demo = store.demo.map((elm, i) => {
			  if (i === index) elm.background = color;
			  return elm;
			});
	
			//reset the global store
			setStore({ demo: demo });
		  },

		  postAnuncio: async (anuncio, url) => {
			const store = getStore();
	
			let response = await fetch(process.env.BACKEND_URL + "/api/anuncios", {
		@@ -80,6 +80,7 @@ const getState = ({ getStore, getActions, setStore }) => {
			  },
			  body: JSON.stringify({
				content: chuit,
				image: url,
			  }), // body data type must match "Content-Type" header
			});
			let data = await response.json();
			if (data) {
			  alert("anuncio publicado satisfactoriamente");
			  setStore({ anuncios: [data, ...store.anuncios] });
			}
		  },
		},
	  };
	};
	
	export default getState;