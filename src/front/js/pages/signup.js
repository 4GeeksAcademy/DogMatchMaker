import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Navigate to Signup2 with email and password
        navigate("/signup2", { state: { email: inputs.email, password: inputs.password } });
    }

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#30598a" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <img 
                            src="https://www.dogster.com/wp-content/uploads/2024/03/owner-petting-happy-dog_Bachkova-Natalia_Shutterstock.jpeg"
                            className="w-100"
                            style={{ 
                                borderTopLeftRadius: ".3rem", 
                                borderTopRightRadius: ".3rem", 
                                height: '400px', 
                                maxHeight: '400px', 
                            }}
                            alt="Sample photo"
                        />
                        <div className="card rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Sign Up</h3>
                                <form className="px-md-2" onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <input 
                                            type="email" 
                                            id="email" 
                                            className="form-control" 
                                            name="email" 
                                            placeholder="Enter email" 
                                            value={inputs.email} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                        <label className="form-label" htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input 
                                            type="password" 
                                            id="password" 
                                            className="form-control" 
                                            name="password" 
                                            placeholder="Enter password" 
                                            value={inputs.password} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                        <label className="form-label" htmlFor="password">Password <span style={{ color: 'red' }}>*</span></label>
                                    </div>
                                    <button type="submit" className="btn btn-success btn-lg mb-1" style={{ backgroundColor: "#f1b873" }}>Next</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
