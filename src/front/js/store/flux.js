const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      user: "",
      token: "",
      section: null,
      var: true,
      matches: [],
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
  
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      changeVisible: (value) => {
        setStore({ var: value });
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

      getMatches: () => {
        return async (dispatch, getState) => {
          const backend = process.env.BACKEND_URL;
          const url = "api/getuserlikes";
          const opts = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getState().store.token}`,
            },
          };
          try {
            const response = await fetch(`${backend}${url}`, opts);
            if (response.ok) {
              const data = await response.json();
              dispatch({
                type: "SET_MATCHES",
                payload: data.matches,
              });
            } else {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          } catch (error) {
            console.error("Error fetching matches:", error);
          }
        };
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
      syncTokenFromSessionStorage: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
        const user = sessionStorage.getItem("user");
        if (user && user != "" && user != undefined) setStore({ user: user });
      },
      logout: () => {
        try {
          console.log("logout");
          sessionStorage.removeItem("token");
          setStore({ token: null, section: "/", message: null, user: null });
          const resp = fetch(process.env.BACKEND_URL + "/api/logout", {
            method: "POST",
            //credentials: 'include'
          })
            .then((response) => response.json())
            .then((data) => setStore({ message: data.message }));
        } catch (error) {
          console.log("Error log out", error);
        }
      },
      privateArea: async () => {
        try {
          const store = getStore();
          const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
            method: "GET",
            headers: { Authorization: "Bearer " + store.token },
            //credentials: 'include'
          });
          if (resp.status == 401) {
            getActions().logout();
          }
          const data = await resp.json();
          setStore({ message: data.message, section: data.section });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      login: async (email, password) => {
        try {
          let requestOptions = {
            method: "POST",
            //credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          };

          const resp = await fetch(
            process.env.BACKEND_URL + "/api/token",
            requestOptions
          );

          if (resp.status !== 200) {
            alert("There has been some error");
            return false;
          }

          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("user", email);
          sessionStorage.setItem("user", email);
          setStore({ token: data.access_token, user: email });
          return true;
        } catch (error) {
          console.error("Error during login", error);
          return false;
        }
      },
    },
  };
};

export default getState;
