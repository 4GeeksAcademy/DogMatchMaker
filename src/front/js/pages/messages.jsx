import React from "react";
import Sidebar from "../component/sidebar.jsx";

const Messages = () => {
    return(
        <div>
            <div className="row">
                <div className="col-3"><Sidebar/></div>
                <div className="col-6"><h1 className="text-center">Hello</h1></div>
                <div className="col-3">$</div>
            </div>
        </div>
    );
}

export default Messages;