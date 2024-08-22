import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        actions.login(inputs['email'], inputs['pswd']).then(() =>{
            navigate("/private");
        })
    }

      useEffect(() => {
        if (store.token && store.token != '' && store.token != undefined ) navigate("/private")
            
      }, [store.token])

    return (
        <section className="h-100" style={{
            position: 'relative',
            overflow: 'hidden',
            margin: 0, // Ensure no margin
            padding: 0, // Ensure no padding
            height: '100vh' // Use viewport height to ensure full height
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
                            borderRadius: '15px', // Adjust this value to control the roundness
                            boxShadow: '15px 17px 5px 2px rgba(0,0,0,0.52)',
                            WebkitBoxShadow: '15px 17px 5px 2px rgba(0,0,0,0.52)',
                            MozBoxShadow: '15px 17px 5px 2px rgba(0,0,0,0.52)'
                        }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Log In</h3>
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
                                            className="btn btn-secondary btn-lg" 
                                            style={{ backgroundColor: "#e4dcbd", color: "black" }}
                                        >
                                            Log In
                                        </button>
                                        <div className="text-end">
                                            Don't have an account? <Link to="/signup" style={{ color: "#30598a" }}>Sign Up</Link>
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
