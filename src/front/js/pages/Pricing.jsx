import React from "react";
import "../../styles/pricing.css";
import { Link } from "react-router-dom";



export const Pricing = () => (
  <div className="pricing-header  pb-md-4 mx-auto text-center text-dark ">
    <h1 className="display-4 fw-normal fw-bold ">Pricing</h1>
    <p className="fs-5 text-dark fw-bold ">At Paw Friends, we believe every tail deserves to wag with joy, which is why we offer a range of affordable plans to fit every budget. Whether you're looking for basic features or more comprehensive options, our pricing is designed to ensure that both you and your furry friend get the best value and care. Explore our flexible plans and find the perfect fit that makes connecting with other paws and discovering new adventures a breeze. With Paw Friends, great value and endless fun are just a click away!</p>
    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center ">
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm ">
          <div className="card-header py-3 ">
            <h4 className="my-0 fw-normal">Paw Friends Free</h4>
          </div>
          <div className="card-body rounded-circle">
            <h1 className="card-title pricing-card-title">$0<small className="text-muted fw-light">/mo</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>10 dogs you can match with
              </li>
              <li>Tail wagging support</li>
              <li>Playground access</li>
              <li>Daily activity updates</li>

            </ul>
            <Link to="/signup">
            <button type="button" className="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">Paw Friends Pro</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">$15<small className="text-muted fw-light">/mo</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li></li>
              <li>20 dogs you can match with</li>
              <li>Pure breeds only access</li>
              <li>Premium access to dog events</li>
              <li>Customizable profiles</li>

            </ul>
            <Link to="/signup">
            <button type="button" className="w-100 btn btn-lg btn-outline-primary">Get started</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm ">
          <div className="card-header py-3 text-dark  ">
            <h4 className="my-0 fw-normal">Paw Friends  Enterprise</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">$29<small className="text-muted fw-light">/mo</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>Unlimited dog matches</li>
              <li>Pure breeds only access</li>
              <li>Live video meet</li>
              <li>All in one solution</li>
             
            </ul>
            <Link to= "/signup">
            <button type="button" className="w-100 btn btn-lg btn-outline-primary ">Get Started</button>
            </Link>
          </div>

        </div>
      </div>

    </div>
    
  </div>


);



export default Pricing