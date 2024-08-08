import React, { useState, useEffect, useContext } from "react";
import "../../styles/index.css";

const Notifications = ({ style , setStyle }) => {
  console.log(style);
  return (
    <div>
      <a
        id="notifications"
        className={style === "greenglow" ? "glow" : ""}
        onClick={() => {
          console.log("clicked on green");
          if (style !== "greenglow") setStyle("greenglow");
        }}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
      Notifications
      </a>
      <div
        className="offcanvas offcanvas-end" // Changed from offcanvas-start to offcanvas-end
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Notifications
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
