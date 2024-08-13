import React, { useEffect } from "react";
import "../../styles/profilecardinfo.css";

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
        className="offcanvas offcanvas-bottom"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling2"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="bg-dark-top bg-dark">
          <div className="offcanvas-header">
            <h3 className="offcanvas-title" id="dog-name" style={{ fontWeight: 'bolder' }}>
              Shaggy
            </h3>
            <h5 className="dog-pill-info-breed">
              Breed
            </h5>
            <h5 className="dog-pill-info-age">
              12
            </h5>
            {/*ANOTHER COLOR/TEXT CONDITIONAL*/}
            <h5 className="dog-pill-info-male">
              Male
            </h5>
            {/* <h5 className="dog-pill-info-female">
            Female
          </h5> */}
            <h5 className="sub-name-info">
              & Kelsey
            </h5>
            <i
              id="view-info-close"
              className="fa-solid fa-circle-down"
              data-bs-dismiss="offcanvas"
              aria-label="Close">
            </i>
            <i id="location" className="fa-solid fa-location-dot"></i>
            <p id="location-text">currently lives in city</p>
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="text-start">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Bio</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Your super cool bio!"
              rows="5"
              readOnly>
            </textarea>
          </div>
          <hr />
          <div>
            <p>
              More about us...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
