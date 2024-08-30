const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {			
			message: null,
			user: '',
			token: '',
			section: null,
			var: false,
			key: '',
			/* matches: [], */
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
			/* getMatches: () => {
				const store = getStore();
				const backend = process.env.BACKEND_URL;
				const url = "/api/getuserlikes";
				const opts = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${store.token}`,
				},
				};
				fetch(backend + url, opts)
				.then((resp) => {
					if (resp.ok) {
					return resp.json();
					} else {
					throw new Error("problem getting matches");
					}
				})
				.then((data) => setStore({matches: data.matches}))
				.catch((err) => console.error(err));
			}, */
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			changeVisible: (value) => {
				setStore({var : value})
			},
			getMessage: async () => {
				try{
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
				const user = sessionStorage.getItem('user')
				if (user && user != '' && user != undefined ) setStore({ user : user})
			},
			logout: () => {
				try{
					console.log('logout')
					sessionStorage.removeItem('token')
					setStore({ token : null, section: '/', message: null, user: null})
					const resp = fetch(process.env.BACKEND_URL+"/api/logout", {
						method: 'POST'
						//credentials: 'include'
					}).then(response => response.json())
					.then(data => setStore({ message: data.message }));
					
				}catch(error){
					console.log("Error log out", error)
				}
			},
			privateArea: async () => {
				try{
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: 'GET',
						headers: { 'Authorization': 'Bearer '+store.token }
						//credentials: 'include'
					  })					
					if (resp.status == 401) {
						getActions().logout()
					}
					const data = await resp.json()
					setStore({ message: data.message, section: data.section })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getPublicKey: async () => {
				try{
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/public_key", {
						method: 'GET'
					  })		
					const data = await resp.text()
					setStore({ key: data })
					return data;
				}catch(error){
					console.log("Error loading key from backend", error)
				}
			},
			login: async (email, password) => {
				try{
					const store = getStore();
					// Beginning of encryption using Forge package
					var publicKey = forge.pki.publicKeyFromPem(store.key);
					var encrypted = publicKey.encrypt(password, "RSA-OAEP", {
						md: forge.md.sha256.create(),
						mgf1: forge.mgf1.create(),
					});
					const encryptedPassword = forge.util.encode64(encrypted);
					// ending of encryption using Forge package.
					let requestOptions = {
						method: 'POST',
						//credentials: 'include',
						headers: { 'Content-Type': 'application/json' },
						body : JSON.stringify({
							'email': email,
							'password': encryptedPassword
						})
					};

					const resp = await fetch(process.env.BACKEND_URL+"/api/token", requestOptions)
					
					if (resp.status !== 200) {
						alert("There has been some error")
						return false;
					}

                    const data = await resp.json();
                    sessionStorage.setItem('token', data.access_token);
					sessionStorage.setItem('user', email);
                    setStore({ token: data.access_token, user: email });
                    return true;
                } catch (error) {
                    console.error('Error during login', error);
                    return false;
                }
    		},
  		}
	};
};

export default getState;
