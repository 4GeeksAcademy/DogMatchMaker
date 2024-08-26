import React, { useContext } from "react";
import "../../styles/notiboxes.css"
import { Context } from "../store/appContext";

const NewNotification = ({ data }) => {
const { store, actions } = useContext(Context)

    return (
        <div className="notis-container container col-10 row">
           <h5 className="mb-0">Matched with</h5>
           <h6>{data.dog_name} & {data.owner_name}</h6>
        </div>
    );
}

export default NewNotification; 