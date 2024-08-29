import React, { useContext, useEffect, useState } from "react";
import "../../styles/notifications.css";
import { Context } from "../store/appContext.js";
import NewNotification from "./newnotification.jsx";

const Matches = ({ getMatches, matches }) => {
  const { store, actions } = useContext(Context);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => { if (store.token) { getMatches(); } }, [store.token, getMatches]);

  useEffect(() => {
    setIsVisible(store.var);
  }, [store.var]);


  return (
    <div className={`my-pullout text-center ${isVisible ? 'visible' : ''}`}>
      <div className="notifications-head col-12 justify-content-center mt-4">
        <i className="noti-icon fa-solid fa-heart-circle-exclamation my-auto pe-1 pb-1"></i>
        <p className="noti-title">Matches</p>
      </div>
      {Array.isArray(matches) && matches.length > 0 ? matches.map((data, ind) => {
        return (
          <NewNotification data={data.user} key={ind} />
        )
      }) : (<p></p>)}
    </div>
  );
};

export default Matches;