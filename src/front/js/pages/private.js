import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.token && store.token == null && store.token == undefined)
			navigate("/login");
	}, [])

	return (
		<div className="text-center mt-5">
			<div className="container col-4">
			<div className="alert alert-info">
				{store.message}
			</div>
			</div>
			<h1>Private Page</h1>
		</div>
	);
};