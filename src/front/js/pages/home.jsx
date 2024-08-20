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
          <img src={Paw_Friends} alt="Description" className="img-fluid rounded-circle "width="500" height="500" />
        </div>
        <div className="col-md-6 text-center btn-primary-sm">
          <h1 className="fw-bold fs-1 mb-4 mt-3">Paw Friends where nearby paws find their perfect match</h1>
          <Link to="/signup">
            <button className="btn-primary-sm btn btn-primary btn-lg col-6" >Sign Up</button>
            </Link>
        </div>
      </div>
    </div>
  );
};
