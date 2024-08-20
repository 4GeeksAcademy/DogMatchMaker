const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            user: '',
            token: '',
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
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/hello`);
                    if (!resp.ok) throw new Error('Failed to fetch message');
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.error("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            syncTokenFromSessionStorage: () => {
                const token = sessionStorage.getItem('token');
                if (token) setStore({ token });
            },

            logout: async () => {
                try {
                    sessionStorage.removeItem('token');
                    setStore({ token: '', section: 'logout', message: null, user: null });
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/logout`, {
                        method: 'POST'
                    });
                    if (!resp.ok) throw new Error('Logout failed');
                    const data = await resp.json();
                    setStore({ message: data.message });
                } catch (error) {
                    console.error("Error logging out", error);
                }
            },

            privateArea: async () => {
                try {
                    const store = getStore();
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/private`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${store.token}` }
                    });
                    if (resp.status === 401) {
                        getActions().logout();
                    } else if (!resp.ok) {
                        throw new Error('Failed to access private area');
                    }
                    const data = await resp.json();
                    setStore({ message: data.message, section: data.section });
                    return data;
                } catch (error) {
                    console.error("Error loading private area", error);
                }
            },

            login: async (email, password) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/token`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });

                    if (resp.status !== 200) {
                        const errorData = await resp.json();
                        alert(errorData.message || 'Login failed');
                        return false;
                    }

                    const data = await resp.json();
                    sessionStorage.setItem('token', data.access_token);
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
