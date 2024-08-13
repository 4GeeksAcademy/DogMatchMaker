import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Paw from "../../img/Paw.png";
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        if (!store.token && store.section === 'logout') {
            navigate("/");
            actions.setSection('');  // Clear the section to avoid immediate redirection loop
        }
    }, [store.token, store.section, navigate]);

    const handleLinkClick = () => {
        setIsNavOpen(false);
    };

    const toggleNavbar = () => {
        setIsNavOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        actions.logout();  // Clear token and set section to 'logout'
        actions.setSection('logout');
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
                    <div className="d-flex flex-grow-1">
                        <ul className="navbar-nav mx-auto">
                            {!store.token ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <li className="nav-item my-3">
                                        <Link to="/private" className="text-decoration-none m-3 my-3 text-light" onClick={handleLinkClick}>Dashboard</Link>
                                    </li>
                                    <li className="nav-item my-3">
                                        <Link to="/profile" className="text-decoration-none mx-3 my-3 text-light" onClick={handleLinkClick}>Profile</Link>
                                    </li>
                                    <li className="nav-item my-3">
                                        <Link to="/settings" className="text-decoration-none mx-3 text-light" onClick={handleLinkClick}>Settings</Link>
                                    </li>
                                    <li className="nav-item my-3 mx-3">
                                        <Link to="/contact" className="text-decoration-none text-light" onClick={handleLinkClick}>Contact</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="d-flex ms-auto">
                        {store.token ? (
                            <button onClick={handleLogout} type="button" className="btn btn-primary">Log out</button>
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
