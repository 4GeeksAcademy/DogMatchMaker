import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

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
				<div className="col-3"></div>
				<div className="col-6"><h1>Discover Page</h1></div>
				<div className="col-3"></div>
			</div>
		</div>
	);
};