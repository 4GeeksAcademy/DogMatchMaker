import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Matches from "./matches.jsx";
import img from "../../img/m101.jpg";
import "../../styles/sidebar.css";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const { store, actions } = useContext(Context);
  const [style, setStyle] = useState("discover");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const navbarElement = document.querySelector(".navbar");
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
    const offcanvasElement = document.getElementById("offcanvasScrolling3");
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
    bsOffcanvas.show();
  }, []);

  useEffect(() => {
    navigate('/private')
  }, []);

  const [isVisible, setIsVisible] = useState(true)

  const handleVisibility = () => {
    if (isVisible === true) {
      actions.changeVisible(false)
      setIsVisible(false)
    }
    else if (isVisible !== true) {
      setIsVisible(true)
      actions.changeVisible(true)
      
    }
  }

  return (
    <div className="">
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling3"
        aria-labelledby="offcanvasScrollingLabel"
        style={{
          top: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
          width: "17%", 
        }}
      >
        <Link
          to="/private"
          className="d-flex align-items-center mb-3 mb-md-0 me-0 link-dark text-decoration-none justify-content-center"
        ></Link>
        <ul className="nav nav-pills flex-column mb-auto mt-4 text-start me">
          <li className="nav-item mt-4 mb-4 ms-2">
            <Link
              id="discover"
              to={"/private"}
              className={style === "discover" ? "selected" : ""}
              onClick={() => {
                console.log("Clicked on discover");
                if (style !== "discover") setStyle("discover");
              }}
            >
              <strong>
                <i className="fa-solid fa-heart-circle-plus"></i>Discover
              </strong>
            </Link>
          </li>
          <li className="nav-item mt-2 mb-4 ms-2">
            <Link
              id="messages"
              to={"/messages"}
              className={style === "messages" ? "selected" : ""}
              onClick={() => {
                console.log("clicked on messages");
                if (style !== "messages") setStyle("messages");
              }}
            >
              <strong>
                <i className="fa-solid fa-envelope"></i>Messages
              </strong>
            </Link>
          </li>
          <li className="nav-item mb-2">
          <a id="notifications" onClick={handleVisibility} className="mt-2 ms-2">
        <strong><i className="fa-solid fa-envelope"></i>Matches</strong>
      </a>
          </li>
          
          <li className="nav-item mt-2 mb-4 ms-2">
            <Link
              id="settings-pill"
              to="/settings"
              className={style === "settings" ? "selected" : ""}
              onClick={() => {
                console.log("clicked on settings");
                if (style !== "settings") setStyle("settings");
              }}
            >
              <strong><i className="fa-solid fa-gear"></i>Settings</strong>
            </Link>
          </li>
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
            <img
              src={img}
              alt=""
              width="72"
              height="72"
              className="rounded-circle me-2 p-2"
            />
            <strong style={{ fontSize: "15px" }}>UserName</strong>
          </Link>
          <ul
            className="dropdown-menu text-small shadow text-center"
            aria-labelledby="dropdownUser2"
          >
            <li>
            </li>
            <li>
              <Link
                onClick={() => actions.logout()}
                className="dropdown-item"
                to="#"
                style={{fontSize: '17px'}}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
