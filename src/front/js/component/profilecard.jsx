import React, { useContext, useEffect, useState } from "react";
import ProfileInfo from "./profilecardinfo.jsx";
import "../../styles/profilecards.css";
import { Context } from "../store/appContext.js";
import FrontDogInfoPills from "./front-dog-info-pills.jsx";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import RandomMaleImage from "./random-males.jsx";
import RandomFemaleImage from "./random-females.jsx";

const ProfileCard = ({ data, setNextCard, nextCard, getMatches }) => {
  const { store } = useContext(Context);
  const [show, setShow] = useState(false);
  const [matchInfo, setMatchInfo] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    getMatches();
  }, [matchInfo]);

  function fetchLike() {
    const backend = process.env.BACKEND_URL;
    const url = 'api/like';
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
    };
    fetch(backend + url, opts)
      .then((resp) => {
        if (resp.ok) {
          console.log("You liked this user");
          return resp.json();
        } else {
          throw new Error('Error');
        }
      })
      .then(data => {
        if (data.like.match_likes) {
          handleShow();
          setMatchInfo(data.user);
          console.log("Match");
        }
      })
      .catch(err => console.error(err));
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
          {data.owner_sex === 'Male' ? (
            <div className="img-wrapper">
              <RandomMaleImage userId={data.user_id} />
            </div>
          ) : (
            <div className="img-wrapper">
              <RandomFemaleImage userId={data.user_id} />
            </div>
          )}
        </div>
        <div className="mt-2">
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
                });
              }}></i>
            </div>
            <div>
              <i id="reverse" className="fa regular fa-circle-left" onClick={() => {
                setNextCard({
                  prev: nextCard.prev - 1,
                  next: nextCard.next - 1
                });
              }}></i>
            </div>
            <div>
              <i id="like" className="fa regular fa-circle-check" onClick={() => {
                fetchLike();
                setNextCard({
                  prev: nextCard.prev + 1,
                  next: nextCard.next + 1
                });
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>It's A Match! <i className="fa-solid fa-heart" style={{ color: 'red' }}></i></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4> You matched with {matchInfo?.dog_name} & {matchInfo?.owner_name}!</h4>
          <h5>Don't be shy... Start a message!</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Keep Swiping
          </Button>
          <Button variant="primary" onClick={() => navigate("/messages")}>Message</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileCard;
