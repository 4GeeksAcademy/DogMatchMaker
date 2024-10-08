import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Paw_Friends from "../../img/Paw_Friends.jpeg";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.section === 'Private' && store.token) {
      navigate("/private");
    }
  }, [store.section, store.token]);

  return (
    <div className="container-fluid mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img src={Paw_Friends} alt="Description" className="img-fluid img" height="300" style={{borderRadius: '40px', width: '550px'}}/>
        </div>
        <div className="col-md-6 text-center btn-primary-sm">
          <p id="title-head">Paw Friends</p>
          <p id="title-sub">where nearby paws find their perfect match</p>
        <div className="d-flex justify-content-center" style={{ gap: '5px'}}>
          <Link to="/signup">
            <button className="btn-signup btn btn-lg" style={{padding: '5px 15px', color: 'white',background: 'radial-gradient(circle, #344964 0%, #2b2c41 100%)', borderColor: 'black',  borderRadius: '430x'}}>Sign Up</button>
          </Link>
          <Link to="/login">
            <button type="button" className="register-login-button btn btn-lg" style={{padding: '5px 15px', background: 'radial-gradient(circle, #4580a5 0%, #3e6889 100%)', borderColor: 'black', color: 'white'}}>Log in</button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};
