import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Chat } from "../component/chat";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [currentTab, setCurrentTab] = React.useState(1);

	useEffect(() => {
		if (store.section == 'Private' && store.token && store.token != null && store.token != undefined)
			navigate("/private");
	}, [store.section])

	return (
		<div className="text-center mt-5">
			<h1>Authentication system with Python Flask and React.js {store.user}</h1>
			<Chat name='ajgonzale@gmail.com'	pass='123'/>
			<p>
				<img src={rigoImageUrl} />
			</p>

			

			<nav>
			<div className="nav nav-tabs" id="nav-tab" role="tablist">
				<button className={currentTab == 1 ? "nav-link active" : "nav-link"} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#tab-1" type="button" role="tab" aria-controls="nav-home" aria-selected={currentTab == 1 ? true : false}>Home</button>
				<button className={currentTab == 2 ? "nav-link active" : "nav-link"} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#tab-2" type="button" role="tab" aria-controls="nav-profile" aria-selected={currentTab == 2 ? true : false}>Profile</button>
				<button className={currentTab == 3 ? "nav-link active" : "nav-link"} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#tab-3" type="button" role="tab" aria-controls="nav-contact" aria-selected={currentTab == 3 ? true : false}>Contact</button>
			</div>
			</nav>
			<div className="tab-content" id="nav-tabContent">
			<div className={currentTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="tab-1" role="tabpanel" aria-labelledby="nav-home-tab">First page	
				{currentTab}
				<button id="next" data-bs-target="#nav-profile" type="button" onClick={() => setCurrentTab((prev) => prev + 1)}>Next</button>
			</div>
			<div className={currentTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="tab-2" role="tabpanel" aria-labelledby="nav-profile-tab">Jeff
			<button id="next" data-bs-target="#nav-profile" type="button" onClick={() => setCurrentTab((prev) => prev - 1)}>Back</button>
			<button id="next" data-bs-target="#nav-profile" type="button" onClick={() => setCurrentTab((prev) => prev + 1)}>Next</button>
			</div>
			<div className={currentTab == 3 ? "tab-pane fade show active" : "tab-pane fade"} id="tab-3" role="tabpanel" aria-labelledby="nav-contact-tab">Be happy
			<button id="next" data-bs-target="#nav-profile" type="button" onClick={() => setCurrentTab((prev) => prev - 1)}>Back</button>
			</div>
			</div>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			
			<button className="btn btn-primary" onClick={actions.privateArea} >Private Area</button>
			
		</div>
	);
};