const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			section: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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
			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem('token')
				if (token && token != '' && token != undefined ) setStore({ token : token})
			},
			logout: () => {
				sessionStorage.removeItem('token')
				setStore({ token : null, section: 'logout', message: null})

			},
			privateArea: async () => {
				try{
					const store = getStore();
					let requestOptions = {
						headers: { 'Authorization': 'Bearer '+store.token }
					};
					const resp = await fetch(process.env.BACKEND_URL + "/api/private", requestOptions)
					const data = await resp.json()
					if (resp.status == 401) {
						getActions().logout()
					}
					setStore({ message: data.message, section: data.section })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password) => {
				try{

					let requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body : JSON.stringify({
							'email': email,
							'password': password
						})
					};

					const resp = await fetch(process.env.BACKEND_URL+"/api/token", requestOptions)
					
					if (resp.status !== 200) {
						alert("There has been some error")
						return false;
					}

					const data = await resp.json()
					sessionStorage.setItem("token", data.access_token)
					setStore({ token : data.access_token})
					return true

				} catch (error) {
					console.error('There has been an error log in')
				}
			}
		}
	};
};

export default getState;