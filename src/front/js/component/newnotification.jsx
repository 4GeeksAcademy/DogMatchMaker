import React, { useContext } from "react";
import "../../styles/notiboxes.css"
import { Context } from "../store/appContext";

const NewNotification = ({ data }) => {
const { store, actions } = useContext(Context)

    return (
        <div className="notis-container container col-10">
           <h6>Matched with {data.dog_name}</h6>
        </div>
    );
}

export default NewNotification; 