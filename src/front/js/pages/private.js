import React, { useContext, useEffect, useState } from "react";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token && store.token == null && store.token == undefined)
      navigate("/login");
  }, [store.token]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const resp = await fetch(
      "https://effective-space-garbanzo-jj4jq997457w3jq5j-3001.app.github.dev/api/users"
    );
    const data = await resp.json();
    setUsers(data.users);
  };

  return (
    <div className="private-page text-center">
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
                />
              );
            })}
        </div>
        <div className="col-3 text-start"></div>
        <Matches />
      </div>
    </div>
  );
};
