
import React from "react";
import { BrowserRouter, Route, useLocation , Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import { Login } from "./pages/login.jsx";
import { Signup } from "./pages/signup.jsx";
import { Private } from "./pages/private";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Pricing } from "./pages/Pricing.jsx"
import { About } from "./pages/About.jsx"
import injectContext from "./store/appContext";
import { Contact } from "./pages/Contact.jsx"

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="container-fluid px-0">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />
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
