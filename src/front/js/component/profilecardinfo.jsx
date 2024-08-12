import React, { useEffect } from "react";

const ProfileInfo = () => {
  const toggleNotifications = () => {
    const notificationsOffcanvas = document.getElementById(
      "offcanvasScrolling2"
    );
    const bootstrapOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(
      notificationsOffcanvas
    );

    if (notificationsOffcanvas.classList.contains("show")) {
      bootstrapOffcanvas.hide();
    } else {
      bootstrapOffcanvas.show();
    }
  };

  return (
    <div>
      <i
        id="view-info"
        className="fa regular fa-circle-info"
        onClick={() => {
          console.log("clicked on view info");
          toggleNotifications();
        }}
        data-bs-target="#offcanvasScrolling2"
        aria-controls="offcanvasScrolling2"
      ></i>
      <div
        className="offcanvas offcanvas-top"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling2"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            About person profile
          </h5>
          <i 
          id="view-info-close"
          className="fa-solid fa-arrow-down"
          data-bs-dismiss="offcanvas"
          aria-label="Close">

          </i>
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

export default ProfileInfo;
