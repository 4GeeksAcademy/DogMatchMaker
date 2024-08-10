import React, { useState, useEffect, useContext } from "react";
import "../../styles/index.css";


const Notifications = ({ style, setStyle }) => {
  console.log(style);
  return (
    <div className="mt-4">
      <a
          id="notifications"
          className={style === "notifications" ? "selected" : ""}
          onClick={() => {
            console.log("clicked on notifications");
            if (style !== "notifications") setStyle("notifications");
          }}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling1"
          aria-controls="offcanvasScrolling1"
        >
          <strong>Notifications</strong>
        </a>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling1"
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