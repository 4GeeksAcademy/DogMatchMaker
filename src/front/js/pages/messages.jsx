import React, { useContext } from "react";

import { Chat } from "./../component/chat.jsx";
import { Context } from "../store/appContext";

const Messages = () => {
    const { store, actions } = useContext(Context);
    return(
        <div>
           
            <div className="row">
                <div className="col-3"></div>
                <div className="col-7">       
                         
                    <Chat name={store.user}/>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Messages;