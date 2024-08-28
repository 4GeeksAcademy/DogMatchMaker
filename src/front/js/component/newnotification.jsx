import React, { useContext } from "react";
import "../../styles/notiboxes.css"
import { Context } from "../store/appContext";

const NewNotification = ({ data }) => {
const { store, actions } = useContext(Context)

function deleteLike(data) {
    const backend = process.env.BACKEND_URL;
    const url = 'api/like';
    const opts = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.token}`
        },
        body: JSON.stringify({
            liked_user: data.user_id
        })
    };

    fetch(backend + url, opts)
        .then((resp) => {
            if (resp.ok) {
                console.log("You removed your like for this user");
                return resp.json();
            } else {
                throw new Error('Error');
            }
        })
        .then(data => {
            // Handle the response here if needed
            console.log(data.message); // Success message from the server
        })
        .catch(err => console.error(err));
}


    return (
        <div className="notis-container container col-10 row">
            <div className="col-10">
                <h5 className="m-1">Matched with</h5>
                <h6 className="m-1">{data.dog_name} & {data.owner_name}</h6>
            </div>
            <div className="col-2 noti-box-icon">
                <i className="fa-solid fa-heart-crack"></i>
            </div>
        </div>
    );
}

export default NewNotification; 
/* 
<div className="noti-box-text">
                <h5 className="mb-0 col-8">Matched with</h5>
                <h6>{data.dog_name} & {data.owner_name}</h6>
            </div>
            <div className="break-match-icon col-2">
                <i className="fa-solid fa-heart-crack"></i>
            </div> */