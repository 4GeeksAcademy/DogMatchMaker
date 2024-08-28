import React from "react";
import "../../styles/profilecardinfo.css";
import "../../styles/back-dog-pills.css";
import BackDogInfoPills from "./back-dog-info-pills.jsx";
import TraitPills from "./back-trait-pills.jsx";

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
              <h5 className="back-dog-and-owner-name">
                About {data.dog_name} & {data.owner_name}
              </h5>
            </div>
            <div className="back-pills-line">
              <BackDogInfoPills data={data} />
              <div className="location-info">
                <i className="fa-solid fa-location-dot"></i>
                <p>{data.location}</p>
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
            <TraitPills />
            <textarea
              className="bio form-control p-1 m-0"
              id="exampleFormControlTextarea1"
              placeholder="Your super cool bio!"
              rows="5"
              readOnly
              defaultValue={data.bio}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
