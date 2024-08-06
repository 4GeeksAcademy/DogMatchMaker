import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (store.section == 'Private' && store.token && store.token != null && store.token != undefined)
			navigate("/private");
	}, [store.section])

	return (
		<div className="text-center mt-5">
			<h1>Authentication system with Python Flask and React.js</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			
			<button className="btn btn-primary" onClick={actions.privateArea} >Private Area</button>
			
		</div>
	);
};