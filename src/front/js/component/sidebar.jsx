import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';

const Sidebar = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    const getLinkClass = (link) => {
        return link === activeLink ? 'nav-link active bg-primary text-white' : 'nav-link link-dark';
    };

    const sidebarStyle = {
        width: '280px'
    };

    return (
        <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light" style={sidebarStyle}>
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg className="bi me-2" width="40" height="32">
                    <use xlinkHref="#bootstrap" />
                </svg>
                <span className="fs-4">Logo</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link 
                        className={getLinkClass('/private')} 
                        to="/private"
                    >
                        <svg className="bi me-2" width="16" height="16">
                            <use xlinkHref="#home" />
                        </svg>
                        Discover 
                    </Link>
                </li>
                <li>
                    <Link 
                        className={getLinkClass('/messages')} 
                        to="/messages"
                    >
                        <svg className="bi me-2" width="16" height="16">
                            <use xlinkHref="#speedometer2" />
                        </svg>
                        Messages
                    </Link>
                </li>
                {/* Uncomment and use these links if needed */}
                {/* <li>
                    <Link 
                        className={getLinkClass('/matches')} 
                        to="/matches"
                    >
                        <svg className="bi me-2" width="16" height="16">
                            <use xlinkHref="#table" />
                        </svg>
                        Matches
                    </Link>
                </li>
                <li>
                    <Link 
                        className={getLinkClass('/settings')} 
                        to="/settings"
                    >
                        <svg className="bi me-2" width="16" height="16">
                            <use xlinkHref="#grid" />
                        </svg>
                        Settings
                    </Link>
                </li> */}
            </ul>
            <hr />
            <div className="dropdown">
                <Link
                    to="#"
                    className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                    id="dropdownUser2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </Link>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><Link className="dropdown-item" to="#">Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link onClick={() => actions.logout()} className="dropdown-item" to="#">Sign out</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
