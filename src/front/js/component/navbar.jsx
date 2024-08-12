import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Paw from "../../img/Paw.png";

import "../../styles/navbar.css";

export const Navbar = () => {
   
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.section === 'logout') {
            navigate("/");
        }
    }, [store.section, navigate]);

    return (
        <nav className="navbar custom-blue navbar-expand-lg  navbar-light  sticky-top ">
            <div className="col-12 container-fluid">
                <Link to="/">
                    <img src={Paw} width={90} height={90} alt="Dog paw logo" className="bg-transparent" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse col-10 justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item my-3">
                            <Link to="/" className="text-decoration-none m-3 my-3 text-light">Home</Link>
                        </li>
                        <li className="nav-item my-3">
                            <Link to="/about" className="text-decoration-none  mx-3 my-3 text-light">About Us</Link>
                        </li>
                        <li className="nav-item my-3">
                            <Link to="/pricing" className="text-decoration-none  mx-3 text-light">Pricing</Link>
                        </li>
                        <li className="nav-item my-3 mx-3">
                            <Link to="/contact" className="text-decoration-none  text-light">Contact</Link>
                        </li>
                    </ul>
                    
                    {store.token ? (
                        <button onClick={() => actions.logout()} type="button" className="btn btn-primary">Log out</button>
                    ) : (
                        <Link to="/login">
                            <button type="button" className="btn btn-primary d-flex ms-auto">Log in</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
