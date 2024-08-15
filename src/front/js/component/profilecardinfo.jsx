import React from "react";
import "../../styles/profilecardinfo.css";

const ProfileInfo = ({data}) => {
  const toggleNotifications = () => {
    const notificationsOffcanvas = document.getElementById("offcanvasScrolling2");
    const bootstrapOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(notificationsOffcanvas);

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
        <div className="offcanvas-top">
          <div className="offcanvas-header">
            <h3 className="offcanvas-title" id="dog-name" style={{ fontWeight: 'bolder' }}>
              {data.dog_name}
            </h3>
            <h5 className="dog-pill-info-breed">
              {data.breed}
            </h5>
            <h5 className="dog-pill-info-age">
              {data.dog_age}
            </h5>
            <h5 className="dog-pill-info-male">
              {data.dog_sex}
            </h5>
            <h5 className="sub-name-info">
              & {data.owner_name}
            </h5>
            <div>
              <i
                id="view-info-close"
                className="fa-solid fa-circle-down"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></i>
            </div>
            <i id="location" className="fa-solid fa-location-dot"></i>
            <p id="location-text">currently living in {data.location}</p>
          </div>
        </div>
        <div className="offcanvas-body my-1 mx-1">
          <div className="text-start">
            <h5 className="trait-pill1">
            {data.traits}
            </h5>
            <h5 className="trait-pill2">
              {data.traits}
            </h5>
            <h5 className="trait-pill3">
            {data.traits}
            </h5>
            <h5 className="trait-pill4">
            {data.traits}
            </h5>
            <textarea
              className="bio form-control p-1 m-0"
              id="exampleFormControlTextarea1"
              placeholder="Your super cool bio!"
              rows="6"
              readOnly
            >
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
