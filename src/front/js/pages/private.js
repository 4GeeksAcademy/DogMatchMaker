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
		<div className="container-fluid col-12">
			<div className="text-center mt-5">
				<div className="container col-4">
					<div className="alert alert-info">
						{store.message}
					</div>
				</div>
					<div className="row">
						<div className="col-3"></div>
						<div className="col-6">#</div>
						<div className="col-3">$</div>
					</div>
			</div>
		</div>
	);
};