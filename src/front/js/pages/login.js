import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { email, pswd } = inputs;

        
        if (!email || !pswd) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        try {
            const result = await actions.login(email, pswd);

            
            if (result.success) {
                localStorage.setItem('access_token', result.token); 
                navigate("/");
            } else {
                setErrorMessage(result.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            console.error('Login error:', error);
        }
    }

    useEffect(() => {
        if (store.token) {
            navigate("/private");
        }
    }, [store.token, navigate]);

    return (
        <section className="h-100" style={{
            position: 'relative',
            overflow: 'hidden',
            margin: 0, 
            padding: 0, 
            height: '100vh' 
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url('https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2024/02/020124_eg_dog_breeds_feat.jpg?fit=1030%2C580&ssl=1')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(5px)',
                zIndex: -1,
                height: '100%',
                width: '100%'
            }}></div>
            <div className="container py-5 h-100" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card" style={{
                            borderRadius: '15px', 
                            boxShadow: '15px 17px 5px 2px rgba(0,0,0,0.52)',
                            WebkitBoxShadow: '15px 17px 5px 2px rgba(0,0,0,0.52)',
                            MozBoxShadow: '15px 17px 5px 2px rgba(0,0,0,0.52)'
                        }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center" style={{fontWeight: 'bold',}}>Log In</h3>
                                <form className="px-md-2" onSubmit={handleSubmit}>
                                    {errorMessage && (
                                        <div className="alert alert-danger mb-4" role="alert" style={{ backgroundColor: "#f8d7da", color: "#721c24", borderColor: "#f5c6cb" }}>
                                            {errorMessage}
                                        </div>
                                    )}
                                    <div className="form-outline mb-4">
                                        <input 
                                            type="email" 
                                            id="email" 
                                            className="form-control" 
                                            name="email" 
                                            placeholder="Enter email" 
                                            value={inputs.email || ""} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                        <label className="form-label" htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input 
                                            type="password" 
                                            id="pwd" 
                                            className="form-control" 
                                            name="pswd" 
                                            placeholder="Enter password" 
                                            value={inputs.pswd || ""} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                        <label className="form-label" htmlFor="pwd">Password <span style={{ color: 'red' }}>*</span></label>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <button 
                                            type="submit" 
                                            className="login-page-btn btn-secondary btn-lg" 
                                            style={{ background: 'radial-gradient(circle, #344964 0%, #2b2c41 100%)', color: "white"}}
                                        >
                                            Log In
                                        </button>
                                        <div className="text-end">
                                            Don't have an account? <Link to="/signup" className="login-page-signup" style={{ color: 'radial-gradient(circle, #344964 0%, #2b2c41 100%)', boxShadow: '', fontWeight: 'bold'}}>Sign Up</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
