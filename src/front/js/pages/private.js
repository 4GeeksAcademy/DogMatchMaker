import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Chat } from "../component/chat";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.token && store.token == null && store.token == undefined)
			navigate("/login");
	}, [])



	return (
		<div className="text-center mt-5">
			<h1>Private Page</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			
			{// Conditional render example
			// Check to see if the background is orange, if so, display the message
			store.user && store.user != null && store.user != undefined ? (
				<Chat name={store.user}	pass='123'/>
			) : null}

			
			<div className="alert alert-info">
				{store.message}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};