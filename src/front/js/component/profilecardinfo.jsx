import React from "react";

const ProfileInfo = () => {
    return(
        <div>
        <i
          id="info"
          className="fa regular fa-circle-info"
          style={{ fontSize: "50px" }}
          onClick={() => {
        }}
        data-bs-toggle="offcanvas"
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
  
export default ProfileInfo;