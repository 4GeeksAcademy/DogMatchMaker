import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../component/profilecard.jsx";
import Matches from "../component/matches.jsx";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [users, setUsers] = useState(null);
  const [nextCard, setNextCard] = useState({
    prev: 0,
    next: 1,
  });
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token && store.token == null && store.token == undefined)
      navigate("/login");
  }, [store.token]);

  useEffect(() => {
    getUsers();
  }, []);

  
 /*  useEffect(() => {
    console.log(matches);
  }, [matches]); */

  const getUsers = async () => {
    const resp = await fetch(process.env.BACKEND_URL + "/api/users");
    const data = await resp.json();
    setUsers(data.users);
  };

  const getMatches = useCallback(async () => {
    const backend = process.env.BACKEND_URL;
    const url = "api/getuserlikes";
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`,
      },
    };
    try {
      const response = await fetch(`${backend}${url}`, opts);
      if (response.ok) {
        const data = await response.json();
        setMatches(data.matches);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }, [store.token]);

  return (
    <div className="private-page text-center container">
      <div className="container-fluid row">
        <div className="col-8 justify-content-end mt-4 d-flex">
          {users !== null &&
            users.slice(nextCard.prev, nextCard.next).map((data, ind) => {
              return (
                <ProfileCard
                  data={data}
                  setNextCard={setNextCard}
                  nextCard={nextCard}
                  key={ind}
                  getMatches={getMatches}
                />
              );
            })}
        </div>
        <div className="col-3 text-start"></div>
        <Matches getMatches={getMatches} matches={matches} />
      </div>
    </div>
  );
};
