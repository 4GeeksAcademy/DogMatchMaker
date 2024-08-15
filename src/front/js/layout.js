import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import injectContext, { Context } from "./store/appContext";

import { Home } from "./pages/home.jsx";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Private } from "./pages/private";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Contact } from "./pages/Contact.jsx"
import Pricing from "./pages/Pricing.jsx"
import { About } from "./pages/About.jsx"
import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import ScrollToTop from "./component/scrollToTop.jsx";
import Messages from "./pages/messages.jsx";
import Sidebar from "./component/sidebar.jsx";
import Profile from "./pages/profile.jsx";
import Notifications from "./component/notifications.jsx";
import Settings from "./pages/settings.jsx";

//create your first component
const Layout = () => {
    const {store, actions} = useContext(Context)
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (

        <div className="container-fluid px-0">
            <BrowserRouter basename={basename}>
                <ScrollToTop>   
                    <Navbar />
                    {(store.token && store.token != null && store.token != undefined ) && <Sidebar/>}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />
                        <Route element={< Messages/>} path="/messages" />
                        <Route element={< Profile/>} path="/profile" />
                        <Route element={< Settings/>} path="/settings" />
                        <Route element={< Notifications/>} path="/notifications" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Pricing />} path="/Pricing" />
                        <Route element={<Contact/>} path="/Contact"/>
                        <Route element={<Footer/>} path="/footer"/>
                        <Route element={<About />} path="/About" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
