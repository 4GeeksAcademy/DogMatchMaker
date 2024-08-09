import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import Notifications from "./notifications.jsx";
import img from "../../img/m101.jpg";
import logo from "../../img/updatedlogo.png";

const Sidebar = () => {
  const { store, actions } = useContext(Context);

  const [style, setStyle] = useState("discover");
  const changeSelected = () => {
    if (style == "messages") {
      setStyle("discover");
    } else if (style == "discover") {
      setStyle("notifications");
    } else if (style == "notifications") {
      setStyle("messages");
    }
  };

  const sidebarStyle = {
    width: "250px",
  };

  return (
    <div
      className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light "
      style={sidebarStyle}
    >
      <Link
        to="/private"
        className="d-flex align-items-center mb-3 mb-md-0 me-0 link-dark text-decoration-none justify-content-center"
      >
        <span>
          <img
            style={{ width: "202px", height: "202px", padding: "0" }}
            src={logo}
          />
        </span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            id="discover"
            to={"/private"}
            className={style == "discover" ? "selected" : ""}
            onClick={() => {
              console.log("Clicked on discover");
              if (style !== "discover") setStyle("discover");
            }}
          >
            Discover
          </Link>
        </li>
        <li>
          <Link
            id="messages"
            to={"/messages"}
            className={style == "messages" ? "selected" : ""}
            onClick={() => {
              console.log("clicked on messages");
              if (style !== "messages") setStyle("messages");
            }}
          >
            Messages
          </Link>
        </li>
        <li>
          <Notifications style={style} setStyle={setStyle} />
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
            width="52"
            height="52"
            className="rounded-circle me-2"
          />
          <strong style={{ fontSize: "15px" }}>UserName</strong>
        </Link>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link
              onClick={() => actions.logout()}
              className="dropdown-item"
              to="#"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
