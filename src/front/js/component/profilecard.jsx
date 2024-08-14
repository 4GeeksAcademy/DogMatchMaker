import React from "react";
import girlwithdog from "../../img/girlanddog2.jpg";
import ProfileInfo from "./profilecardinfo.jsx";
import "../../styles/profilecards.css";

const ProfileCard = () => {
  return (
    <div id="carouselExampleIndicators" className="profile-card carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators top-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={girlwithdog} className="card-img" />
        </div>
        <div className="carousel-item">
          <img src={girlwithdog} className="card-img" />
        </div>
        <div className="carousel-item">
          <img src={girlwithdog} className="card-img" />
        </div>
        <div className="mt-2">
          <img src={girlwithdog} className="card-img" />
          <h2 className="names"><strong>Shaggy</strong></h2>
          <h5 className="sub-name">& Kelsey</h5>
          <h6 className="breed-pill">Breed</h6>
          <h6 className="dog-age-pill">12</h6>
          <h6 className="dog-male-pill">Male</h6>
          <div className="justify-content-center d-flex">
            <div>
              <i id="close" className="fa regular fa-circle-xmark"></i>
            </div>
            <div>
              <i id="reverse" className="fa regular fa-circle-left"></i>
            </div>
            <div>
              <i id="like" className="fa regular fa-circle-check"></i>
            </div>
            <ProfileInfo />
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ProfileCard;
