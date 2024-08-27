import React, { useContext, useState } from "react";
import girlwithdog from "../../img/girlanddog2.jpg";
import ProfileInfo from "./profilecardinfo.jsx";
import "../../styles/profilecards.css";
import { Context } from "../store/appContext.js";
import FrontDogInfoPills from "./front-dog-info-pills.jsx";

const ProfileCard = ({ data, setNextCard, nextCard }) => {
  const { store, actions } = useContext(Context)
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  function fetchLike() {
    const backend = process.env.BACKEND_URL
    const url = 'api/like'
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      },
      body: JSON.stringify({
        current_user_id: store.user,
        liked_user: data.user_id,
      })
    }
    fetch(backend + url, opts)
      .then((resp) => {
        if (resp.ok) {
          console.log("You liked this user")
          return resp.json()
        }
        else {
          throw new Error('Error')
        }
      })
      .then(data => { if (data.like.match_likes === true) {console.log("Match")}})
      .catch(err => console.error(err))
  }
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
          <div className="front-card-names">
            <h2 className="front-dog-name"><strong>{data.dog_name}</strong></h2>
            <h5 className="front-owner-name">& {data.owner_name}</h5>
          </div>
          <FrontDogInfoPills data={data} />
          <div className="justify-content-center d-flex">
            <div>
              <i id="close" className="fa regular fa-circle-xmark" onClick={() => {
                setNextCard({
                  prev: nextCard.prev + 1,
                  next: nextCard.next + 1
                })
              }}></i>
            </div>
            <div>
              <i id="reverse" className="fa regular fa-circle-left" onClick={() => {
                setNextCard({
                  prev: nextCard.prev - 1,
                  next: nextCard.next - 1
                })
              }}></i>
            </div>
            <div>
              <i id="like" className="fa regular fa-circle-check" onClick={() => {
                fetchLike();
                setNextCard({
                  prev: nextCard.prev + 1,
                  next: nextCard.next + 1
                })
              }}></i>
            </div>
            <ProfileInfo data={data} />
          </div>
        </div>
      </div>
      <button className="cpi carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="cpi carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
