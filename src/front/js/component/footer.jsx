import React from 'react';


 export const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Paw Friends</h5>
            <p>Your go-to platform for connecting paws and finding the perfect match nearby.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
              <li><a href="/pricing" className="text-white">Pricing</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <a href="https://www.facebook.com/pawfriends" className="text-white me-2" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i> Facebook
            </a>
            <br />
            <a href="https://twitter.com/pawfriends" className="text-white me-2" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter"></i> Twitter
            </a>
            <br />
            <a href="https://www.instagram.com/pawfriends" className="text-white" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i> Instagram
            </a>
          </div>
        </div>
        <div className="text-center py-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} Paw Friends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
