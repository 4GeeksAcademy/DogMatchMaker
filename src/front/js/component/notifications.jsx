import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import { Link } from "react-router-dom";

const Notifications = ({ style, setStyle }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Get the height of the navbar and set it to state
    const navbarElement = document.querySelector(".navbar");
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
  }, []);

  const toggleNotifications = () => {
    const notificationsOffcanvas = document.getElementById("offcanvasScrolling1");
    const bootstrapOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(notificationsOffcanvas);

    if (notificationsOffcanvas.classList.contains("show")) {
      bootstrapOffcanvas.hide();
    } else {
      bootstrapOffcanvas.show();
    }
  };

  return (
    <div className="mt-2 ms-2">
      <a
        id="notifications"
        onClick={() => {
          console.log("clicked on notifications");
          toggleNotifications();
        }}
      >
        <strong><i class="fa-solid fa-envelope"></i>Notifications</strong>
      </a>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling1"
        aria-labelledby="offcanvasScrollingLabel"
        style={{
          top: `${navbarHeight}px`, // Position it below the navbar
          height: `calc(100vh - ${navbarHeight}px)`, // Full height minus navbar
          width: '25%', // Full width of the right side
          borderTop: '1px solid lightgray',
        }}
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
