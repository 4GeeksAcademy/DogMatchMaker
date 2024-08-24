import React, { useContext, useEffect, useState } from "react";
import "../../styles/notifications.css";
import { Context } from "../store/appContext.js";
import NewNotification from "./newnotification.jsx";

const Matches = () => {
  const { store, actions } = useContext(Context);
  const [isVisible, setIsVisible] = useState(true);
  const [newMatch, setNewMatch] = useState([]);

  useEffect(() => {
    if(store.token !== null && store.token !== undefined && store.token !== '') {
      getMatches()      
    }
  }, [store.token]);

  useEffect(() => {
    setIsVisible(store.var);
  }, [store.var]);

  function getMatches(){
    const backend = process.env.BACKEND_URL
    const url = 'api/getuserlikes'
    const opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      },
    }
    fetch(backend + url, opts)
    .then(resp => {
      if(resp.ok){
        return resp.json()
      }
      else{
        throw new Error("problem getting matches")
      }
    })
    .then(data => setNewMatch(data.matches))
    .catch(err => console.error(err))
  }
  return (
    <div className={`my-pullout text-center ${isVisible ? 'visible' : ''}`}>
      <div className="notifications-head col-12 justify-content-center mt-4">
        <i className="noti-icon fa-solid fa-heart-circle-exclamation my-auto pe-1 pb-1"></i>
        <p className="noti-title">Matches</p>
      </div>
      {newMatch.map((data, ind)=>{
        return (
          <NewNotification data={data} key={ind}/>
        )
      })}
    </div>
  );
};

export default Matches;
