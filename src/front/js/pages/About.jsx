import React from "react";
import "../../styles/About.css";
import Paw_Friends from "../../img/Paw_Friends.jpg";

// Import review images
import Paw_Meet from "../../img/Paw_Meet.jpeg";
import Paw_Meet2 from "../../img/Paw_Meet2.jpeg";
import Paw_Meet3 from "../../img/Paw_Meet3.jpeg";

export const About = () => {
  return (
    <>
      <section className="container py-5 ">
        <div className="row align-items-center container-fluid">
          {/* Text Section */}
          <div className="col-md-6">
            <h1 className="my-3 fw-bold">Welcome to Paw Friends, where dog lovers unite!</h1>
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
              className="img-fluid rounded-circle bg-transparent"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
        {/* Review Section */}
        <section className="container py-5">
          <div className="row">
            <div className="col-12">
              <h2 className="fw-bold text-center mb-4">What Our Community Says</h2>
              <p className="fs-5 text-center">
                At Paw Friends, we're not just about connecting paws—we're about building lifelong friendships and creating unforgettable experiences for both pets and their owners. But don't just take our word for it! Our community of happy pet parents has a lot to say about how Paw Friends has transformed their lives. From finding the perfect playmate to forming bonds that last a lifetime, read on to discover how Paw Friends is making a difference, one wagging tail at a time.
              </p>
            </div>
          </div>

          <div className="row">
            {/* Review 1 */}
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src={Paw_Meet} className="card-img-top" alt="Review 1" />
                <div className="card-body">
                  <h5 className="card-title">Arrow & Daisy</h5>
                  <p className="card-text">Paw Friends has been a life-changing experience for both of us and our dogs. Through the platform, we connected and quickly discovered that our dogs were a perfect match. What started as a simple meetup turned into a weekly routine filled with joy and excitement, as our dogs eagerly anticipate their next playdate. The bond between our dogs has also brought us closer as owners, creating a meaningful friendship that we both cherish. Thanks to Paw Friends, our lives are richer, and our dogs couldn't be happier.</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="col-md-4 mb-4">
              <div className="card ">
                <img src={Paw_Meet2} className="card-img-top" alt="Review 2" />
                <div className="card-body overflow-auto " style={{ height: "377px" }}>
                  <h5 className="card-title">Bells & Max</h5>
                  <p className="card-text">Paw Friends changed our lives in unexpected and wonderful ways. We initially looked for playmates for our dogs, Bella and Max, but our first meetup brought more than just a joyful bond between them. As we watched them play together, we started talking and soon realized we shared a deep connection. What began as a shared love for our dogs quickly grew into a meaningful relationship. Our regular meetups blossomed into a beautiful love story, proving that Paw Friends united not only our dogs but also our hearts and lives.</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src={Paw_Meet3} className="card-img-top" alt="Review 3" />
                <div className="card-body">
                  <h5 className="card-title">Emily & Luna</h5>
                  <p className="card-text">Paw Friends has truly transformed our lives and the lives of our dogs. We connected through the platform and quickly realized that our dogs were the perfect match. What began as a casual meetup soon became a weekly tradition filled with joy and excitement, with our dogs eagerly looking forward to each playdate. The growing bond between our dogs has brought us closer as owners, leading to a friendship we both deeply value. Thanks to Paw Friends, our lives are fuller, and our dogs have never been happier.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

    </>
  );
};

