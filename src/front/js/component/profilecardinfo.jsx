import React from "react";
import "../../styles/profilecardinfo.css";
import BackDogInfoPills from "./back-dog-info-pills.jsx";

const ProfileInfo = ({ data }) => {
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
            <div className="back-card-names">
              <h3 className="back-dog-name">
                {data.dog_name}
              </h3>
              <h5 className="back-owner-name">
                & {data.owner_name}
              </h5>
            </div>
            <div className="back-pills-line">
            <BackDogInfoPills data={data} />
            <div className="location-info">
              <i className="fa-solid fa-location-dot"></i>
              <p>{data.location}, FL</p>
            </div>
            </div>
          </div>
          <div>
              <i
                id="view-info-close"
                className="fa-solid fa-circle-down"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></i>
            </div>
        </div>
        <div className="offcanvas-body my-1 mx-1">
          <div className="text-start">
            <div className="traits-pills">
            <h5 className="trait-pill1">
              Friendly
            </h5>
            <h5 className="trait-pill2">
              Energetic
            </h5>
            <h5 className="trait-pill3">
              Gentle
            </h5>
            </div>
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
