import React, { useContext, useEffect, useState } from "react";
import "../../styles/notifications.css";
import { Context } from "../store/appContext";

const Notifications = () => {
  const { store, actions } = useContext(Context);
  const [isVisible, setIsVisible] = useState('true')

  useEffect(() => {
    setIsVisible(store.var)
  },[store.var])


  const handleVisibility = () => {
    if (isVisible === true) {
      setIsVisible(false)
    }
    else if (isVisible !== true) {
      setIsVisible(true)
    }
  }

  return (
      <div className="my-pullout text-center" style={{ display: isVisible ? 'block' : 'none' }}>
        <i className="fa-solid fa-envelope"></i><p className="noti-title">Notifications</p>
      </div>
  );
};

export default Notifications;
