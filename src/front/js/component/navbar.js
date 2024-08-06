
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (store.section == 'logout')
			navigate("/");
	}, [store.section])

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button type="button" className="btn btn-primary">Check the Context in action</button>
					</Link>
					{store.token && store.token != '' && store.token != undefined ?						
						<button onClick={() => actions.logout()} type="button" className="btn btn-primary">Log out</button>						
						:
						<Link to="/login">
							<button  type="button" className="btn btn-primary">Log in</button>
						</Link>
					}
					
				</div>
			</div>
		</nav>
	);
};
