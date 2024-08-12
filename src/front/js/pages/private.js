import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../component/profilecard.jsx";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.token && store.token == null && store.token == undefined)
			navigate("/login");
	}, [store.token])

	return (
		<div className="text-center">
			<div className="row">
				<div className="col-1 text-start"></div>
				<div className="col-10 justify-content-center d-flex"><ProfileCard/></div>
				<div className="col-1 text-start"></div>
			</div>
		</div>
	);
};