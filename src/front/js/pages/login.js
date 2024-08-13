import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        actions.login(inputs['email'], inputs['pswd'])
      }

      useEffect(() => {
        if(store.token) navigate('/private')
        }, [store.token])

	return (
        
		<div className="mt-5 d-flex justify-content-center">
			<form className="row g-3" onSubmit={handleSubmit} >
                <div className="mb-3 mt-3 text-end">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email:</label>                    
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={inputs.email || ""} onChange={handleChange} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" value={inputs.pswd || ""} onChange={handleChange} required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-12 text-center">
                    <button className="btn btn-primary" type="submit" >Log in</button>
                </div>
                </form>
		</div>
	);
};