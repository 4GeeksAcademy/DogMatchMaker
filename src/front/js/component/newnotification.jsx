import React, { useContext } from "react";
import "../../styles/notiboxes.css"
import { Context } from "../store/appContext";

const NewNotification = () => {
const { store, actions } = useContext(Context)

    return (
        <div className="notis-container container col-10">
            <h3>poop</h3>
        </div>
    );
}

export default NewNotification;