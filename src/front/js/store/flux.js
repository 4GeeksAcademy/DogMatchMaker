const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			section: "",
			message: null,
			contactSuccess: null,
			contactError: null,
			backgroundColor: localStorage.getItem('backgroundColor') || '#000',
			profilePicture: "",
			fullName: "",
			location: "",
			bio: "",
			photots: [],



		},



		actions: {
			// Set the current section in the store
			setSection: (section) => {
				setStore({ section });
			},

			clearContactStatus: () => {
				setStore({ contactSuccess: null, contactError: null });
			},

			

			
			updateProfile : async (profileId, updatedData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL +`api/profile/${profileId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(updatedData),
					});
			
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
			
					const result = await response.json();
					
					// Update local state
					setStore({
						profilePicture: result.profile_picture,
						fullName: result.full_name,
						location: result.location,
						bio: result.bio
					});
					
					console.log('Profile updated successfully:', result);
				} catch (error) {
					console.error('An error occurred while updating the profile:', error);
				}
			},

			initialState: {
				photos: [],
			},
			loadPhotos: () => {
				const photos = [/* array of photo URLs */];
				setStore({ photos });
			},

			addPhoto: (photoUrl) => {
				const store = getStore();
				setStore({ photos: [...store.photos, photoUrl] });
			},
			handleUpload: async (file) => {
				const formData = new FormData();
				formData.append('file', file);

				try {
					const response = await fetch('/api/upload', {
						method: 'POST',
						body: formData,
					});

					if (response.ok) {
						const data = await response.json();
						setStore({
							photos: [...getStore().photos, data.url], // Add the new photo URL to the store
						});
					} else {
						console.error("Failed to upload the photo");
					}
				} catch (error) {
					console.error("An error occurred while uploading the photo:", error);
				}
			},
			setBackgroundColor: (color) => {
				// Update the store
				setStore({ backgroundColor: color });


				// Optionally save to localStorage
				localStorage.setItem('backgroundColor', color);
			},

			submitContactForm: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/contact", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formData),
					});

					const data = await response.json();

					if (response.ok) {
						setStore({ contactSuccess: data.message, contactError: null });
					} else {
						setStore({ contactSuccess: null, contactError: data.error || "Something went wrong!" });
					}
				} catch (error) {
					setStore({ contactSuccess: null, contactError: "Network error or server is down" });
					console.error("Error submitting contact form:", error);
				}
			},





			// Handle logout
			logout: () => {
				sessionStorage.removeItem('token');
				setStore({ token: null, section: 'logout', message: null });
			},

			// Sync the token from sessionStorage
			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem('token');
				if (token) {
					setStore({ token });
				}
			},

			// Fetch a message from the backend
			getMessage: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await response.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.error("Error fetching message:", error);
				}
			},








			privateArea: async () => {
				try {
					const store = getStore();
					let requestOptions = {
						headers: { 'Authorization': 'Bearer ' + store.token }
					};
					const response = await fetch(process.env.BACKEND_URL + "api/private", requestOptions);
					const data = await response.json();
					if (response.status === 401) {
						getActions().logout();
					}
					setStore({ message: data.message, section: data.section });
					return data;
				} catch (error) {
					console.error("Error loading private area:", error);
				}
			},

			// Handle user login
			login: async (email, password) => {
				try {
					let requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					};
					const response = await fetch(process.env.BACKEND_URL + "api/token", requestOptions);
					if (response.status !== 200) {
						alert("There has been an error");
						return false;
					}
					const data = await response.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token, user: email });
					return true;
				} catch (error) {
					console.error('There has been an error logging in:', error);
				}
			}
		}
	};
	return {
		store: {
			message: null,
			user: '',
			token: '',
			section: null,
			var: false,
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
			changeVisible: (value) => {
				setStore({var : value})
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
				if (token && token != '' && token != undefined) setStore({ token: token })
				const user = sessionStorage.getItem('user')
				if (user && user != '' && user != undefined) setStore({ user: user })
			},
			logout: () => {
				try {
					console.log('logout')
					sessionStorage.removeItem('token')
					setStore({ token: null, section: '/', message: null, user: null })
					const resp = fetch(process.env.BACKEND_URL + "/api/logout", {
						method: 'POST'
						//credentials: 'include'
					}).then(response => response.json())
						.then(data => setStore({ message: data.message }));

				} catch (error) {
					console.log("Error log out", error)
				}
			},
			privateArea: async () => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: 'GET',
						headers: { 'Authorization': 'Bearer ' + store.token }
						//credentials: 'include'
					})
					if (resp.status == 401) {
						getActions().logout()
					}
					const data = await resp.json()
					setStore({ message: data.message, section: data.section })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password) => {
				try {

					let requestOptions = {
						method: 'POST',
						//credentials: 'include',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							'email': email,
							'password': password
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
            }
        }
    };
};

export default getState;

