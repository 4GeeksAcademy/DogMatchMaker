import React from "react";
import "../../styles/About.css";
import Paw_Friends from "../../img/Paw_Friends.jpg"
export const About = () => {
  return (
    <section className="container py-5 dog_color">
    <div className="row align-items-center container-fluid">
      {/* Text Section */}
      <div className="col-md-6">
        <h1 className="my-3 fw-bold ">Welcome to Paw Friends, where dog lovers unite!</h1>
        <p className="fs-5 my-5">
          Our mission is to bring together passionate pet owners and their furry companions through engaging and joyful meetups.
          Whether you're seeking new playmates for your pup or looking to connect with fellow dog enthusiasts, Paw Friends offers
          a vibrant community where every wagging tail finds its place.
        </p>
        <p className="fs-5">
          Join us for unforgettable experiences and create lasting memories with your canine companion. From playful park adventures
          to social gatherings, our events are tailored to celebrate the bond between dogs and their owners. Dive into a world of fun,
          friendship, and fur as we make every meetup a memorable occasion for you and your beloved pet.
        </p>
      </div>

      {/* Image Section */}
      <div className="col-md-6 text-center">
        <img 
          src={Paw_Friends} 
          alt="Paw Friends" 
          className="img-fluid round bg-transparent rounded-circle" 
          style={{ maxWidth: '100%' }} // Ensure the image is responsive
        />
      </div>
    </div>
  </section>
  );
};

export default About;
