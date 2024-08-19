const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            section: "",
            message: null,
            contactSuccess: null,  // To store success message
            contactError: null,    // To store error message
        },
        actions: {
            // Set the current section in the store
            setSection: (section) => {
                setStore({ section });
            },
            
            clearContactStatus: () => {
                setStore({ contactSuccess: null, contactError: null });
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
            signup: async (formData) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/signup", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();
                    
                    if (response.ok) {
                        return true; // Indicate success
                    } else {
                        alert(data.error || "Signup failed.");
                        return false; // Indicate failure
                    }
                } catch (error) {
                    console.error('There has been an error:', error);
                    return false; // Indicate failure
                }
            },
            checkUsernameExists: async (username) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `api/check-username?username=${username}`);
                    const data = await response.json();
                    return data.exists; // Adjust according to your API response
                } catch (error) {
                    console.error("Error checking username:", error);
                    return false;
                }
            },
    
    
            // Handle logouta
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
            

            // Fetch data for a private area and handle unauthorized errors
            privateArea: async () => {
                try {
                    const store = getStore();
                    let requestOptions = {
                        headers: { 'Authorization': 'Bearer ' + store.token }
                    };
                    const response = await fetch(process.env.BACKEND_URL + "/api/private", requestOptions);
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
                        body: JSON.stringify({ email, password })
                    };
                    const response = await fetch(process.env.BACKEND_URL + "/api/token", requestOptions);
                    if (response.status !== 200) {
                        alert("There has been an error");
                        return false;
                    }
                    const data = await response.json();
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;
                } catch (error) {
                    console.error('There has been an error logging in:', error);
                }
            }
        }
    };
};

export default getState;
