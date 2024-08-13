
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/updatedlogo.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (store.section == 'logout')
			navigate("/");
	}, [store.section])

	return (
		<nav id="navbar" className="navbar navbar-light bg-light p-0 justify-content-start">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"></span>
				</Link>
				<div className="d-flex row">
					{store.token && store.token != '' && store.token != undefined ?		
					<div>
						<Link to ="/private">	
						<img
						style={{ width: "95px", height: "95px", padding: "0" }}
						src={logo}/>
						</Link>
						<a
						id="pullout-sidebar"
						onClick={() => {}}
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasScrolling3"
						aria-controls="offcanvasScrolling3">
							<i className="hamburg fa-solid fa-bars"></i>
						</a>
					</div>
					
						:
						<Link to="/login">
							<button  type="button" className="btn btn-primary">Log in</button>
						</Link>
					}
					
				</div>
		</nav>
	);
};
