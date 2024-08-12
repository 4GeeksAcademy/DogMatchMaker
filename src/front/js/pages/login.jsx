import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import PawFriends_Park from "../../img/PawFriends_Park.jpeg";
import Paws_BG from "../../img/Paws_BG.png";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({ ...values, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		actions.login(inputs['email'], inputs['pswd']).then(() => {
			navigate("/");
		});
	};

	useEffect(() => {
		if (store.token && store.token !== '' && store.token !== undefined) navigate("/");
	}, [store.token]);

	return (
		<section className="vh-100">
			<div className="container-fluid h-100">
				<div className="row h-100 align-items-center">
					{/* Login Form Column */}
					<div className="col-12 col-md-6 text-black d-flex justify-content-center align-items-center">
						<div className="px-4 px-md-5 w-100">
							<div className="mb-4 text-center">
								<img src={Paws_BG} alt="Background" className="img-fluid" style={{ maxWidth: '100px' }} />
							</div>

							<form onSubmit={handleSubmit} className=" ">
								<h3 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Log in</h3>

								<div className="mb-3">
									<label htmlFor="email" className="form-label">Email:</label>
									<div className="input-group has-validation">
										<span className="input-group-text" id="inputGroupPrepend">@</span>
										<input
											type="email"
											className="form-control"
											id="email"
											placeholder="Enter email"
											name="email"
											value={inputs.email || ""}
											onChange={handleChange}
											required
										/>
										<div className="valid-feedback">
											Looks good!
										</div>
									</div>
								</div>

								<div className="mb-3">
									<label htmlFor="pwd" className="form-label">Password:</label>
									<input
										type="password"
										className="form-control"
										id="pwd"
										placeholder="Enter password"
										name="pswd"
										value={inputs.pswd || ""}
										onChange={handleChange}
										required
									/>
									<div className="valid-feedback">
										Looks good!
									</div>
								</div>

								<div className="pt-1 mb-4 text-center">
									<button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
								</div>

								<p className="small mb-5 pb-lg-2 text-center">
									<a className="text-muted" href="#!">Forgot password?</a>
								</p>
								<p className="text-center mb-0">Don't have an account? <Link to="/signup" className="link-info">Register here</Link></p>
							</form>
						</div>
					</div>

					{/* Image Column */}
					<div className="col-12 col-md-6 d-none d-md-block p-0">
						<img
							src={PawFriends_Park}
							alt="Login"
							className="w-100 vh-100" 
							style={{ objectFit: 'cover', objectPosition: 'center' }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
 