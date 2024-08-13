import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Paw from "../../img/Paw.png";
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false); // State to manage the collapse

    useEffect(() => {
        if (store.section === 'logout') {
            navigate("/");
        }
    }, [store.section, navigate]);

    // Handle link clicks to close the navbar
    const handleLinkClick = () => {
        setIsNavOpen(false);
    };

    // Toggle navbar open/close
    const toggleNavbar = () => {
        setIsNavOpen(prevState => !prevState);
    };

    return (
        <nav className="navbar custom-blue navbar-expand-lg navbar-light sticky-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={Paw} width={90} height={90} alt="Dog paw logo" className="bg-transparent" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarNav"
                    aria-expanded={isNavOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
                    <div className="d-flex md-style sm-style flex-grow-1">
                        <ul className="navbar-nav">
                            <li className="nav-item my-3">
                                <Link to="/" className="text-decoration-none m-3 my-3 text-light" onClick={handleLinkClick}>Home</Link>
                            </li>
                            <li className="nav-item my-3">
                                <Link to="/about" className="text-decoration-none mx-3 my-3 text-light" onClick={handleLinkClick}>About Us</Link>
                            </li>
                            <li className="nav-item my-3">
                                <Link to="/pricing" className="text-decoration-none mx-3 text-light" onClick={handleLinkClick}>Pricing</Link>
                            </li>
                            <li className="nav-item my-3 mx-3">
                                <Link to="/contact" className="text-decoration-none text-light" onClick={handleLinkClick}>Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex ms-auto">
                        {store.token ? (
                            <button onClick={() => actions.logout()} type="button" className="btn btn-primary">Log out</button>
                        ) : (
                            <Link to="/login">
                                <button type="button" className="btn btn-primary">Log in</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
