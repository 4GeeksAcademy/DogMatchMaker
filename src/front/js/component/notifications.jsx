import React, { useContext, useEffect, useState } from "react";
import "../../styles/notifications.css";
import { Context } from "../store/appContext";
import NewNotification from "./newnotification.jsx";

const Notifications = () => {
  const { store, actions } = useContext(Context);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(store.var);
  }, [store.var]);

  return (
    <div className={`my-pullout text-center ${isVisible ? 'visible' : ''}`}>
      <div className="notifications-head col-12 justify-content-center mt-4">
      <i className="noti-icon fa-solid fa-envelope my-auto pe-1 pb-1"></i>
      <p className="noti-title">Notifications</p>
      </div>
      <NewNotification />
    </div>
  );
};

export default Notifications;
