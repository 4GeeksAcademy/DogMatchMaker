import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Paw_download from "../../img/Paw_download.jpeg";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [inputs, setInputs] = useState({});
    const [validated, setValidated] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        if (inputs.password !== inputs.confirmPassword) {
            setPasswordMismatch(true);
            return;
        } else {
            setPasswordMismatch(false);
        }

        // Check if username exists
        const usernameExists = await actions.checkUsernameExists(inputs.username);
        setUsernameExists(usernameExists);
        if (usernameExists) {
            alert("Username already exists. Please choose another one.");
            return;
        }

        if (form.checkValidity() === true && !passwordMismatch) {
            const success = await actions.signup(inputs);
            if (success) {
                navigate("/login");
            }
        }
    };

    return (
        <section className="text-center text-lg-start">
            <div className="container py-4">
                <div className="row g-0 align-items-center">
                    {/* Form Column */}
                    <div className="col-lg-6 mb-5 mb-lg-0 d-flex justify-content-center align-items-center">
                        <div className="card bg-light shadow-sm w-100">
                            <div className="card-body p-5 text-center">
                                <h2 className="fw-bold mb-5">Sign up now</h2>
                                <form noValidate onSubmit={handleSubmit} className="needs-validation">
                                    {/* First and Last Name */}
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    className={`form-control ${validated && !inputs.firstName ? 'is-invalid' : ''}`}
                                                    name="firstName"
                                                    value={inputs.firstName || ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="firstName">First name</label>
                                                <div className="invalid-feedback">
                                                    Please provide your first name.
                                                </div>
                                                {validated && inputs.firstName && (
                                                    <div className="valid-feedback">Looks good!</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    className={`form-control ${validated && !inputs.lastName ? 'is-invalid' : ''}`}
                                                    name="lastName"
                                                    value={inputs.lastName || ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="lastName">Last name</label>
                                                <div className="invalid-feedback">
                                                    Please provide your last name.
                                                </div>
                                                {validated && inputs.lastName && (
                                                    <div className="valid-feedback">Looks good!</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Username */}
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="username"
                                            className={`form-control ${validated && (!inputs.username || usernameExists) ? 'is-invalid' : ''}`}
                                            name="username"
                                            value={inputs.username || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <div className="invalid-feedback">
                                            {usernameExists ? "Username already exists." : "Please provide a username."}
                                        </div>
                                        {validated && inputs.username && !usernameExists && (
                                            <div className="valid-feedback">Looks good!</div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="email"
                                            className={`form-control ${validated && !inputs.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={inputs.email || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="form-label" htmlFor="email">Email address</label>
                                        <div className="invalid-feedback">
                                            Please provide a valid email address.
                                        </div>
                                        {validated && inputs.email && (
                                            <div className="valid-feedback">Looks good!</div>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="password"
                                            className={`form-control ${validated && !inputs.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            value={inputs.password || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <div className="invalid-feedback">
                                            Please provide a password.
                                        </div>
                                        {validated && inputs.password && (
                                            <div className="valid-feedback">Looks good!</div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className={`form-control ${validated && (passwordMismatch ? 'is-invalid' : '')}`}
                                            name="confirmPassword"
                                            value={inputs.confirmPassword || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                        <div className="invalid-feedback">
                                            {passwordMismatch ? "Passwords do not match." : "Please confirm your password."}
                                        </div>
                                    </div>

                                    {/* Checkbox */}
                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="newsletter"
                                            name="newsletter"
                                        />
                                        <label className="form-check-label" htmlFor="newsletter">
                                            Subscribe to our newsletter
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Sign up
                                    </button>

                                    {/* Register Buttons */}
                                    <div className="text-center">
                                        <p>or sign up with:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-facebook-f"></i>
                                        </button>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-google"></i>
                                        </button>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-twitter"></i>
                                        </button>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-github"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="col-lg-6 mb-5 mb-lg-0 d-none d-lg-block">
                        <img
                            src={Paw_download}
                            className="img-fluid w-100 h-100 rounded shadow-sm"
                            alt="Product"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
