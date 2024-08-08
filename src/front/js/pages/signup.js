import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [step, setStep] = useState(1);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        dog_name: '',
        owner_name: '',
        nick_name: '',
        dog_age: '',
        location: '',
        breed: '',
        dog_sex: '',
        bio: '',
        interests: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null); // State for preview image
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfilePicture(file);
        if (file) {
            setPreview(URL.createObjectURL(file)); // Set preview URL
        }
    }

    const handleRemovePicture = () => {
        setProfilePicture(null);
        setPreview(null);
    }

    const handleNext = () => {
        setStep(prevStep => prevStep + 1);
    }

    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('email', inputs.email);
        formData.append('password', inputs.password);
        formData.append('dog_name', inputs.dog_name);
        formData.append('owner_name', inputs.owner_name);
        formData.append('nick_name', inputs.nick_name);
        formData.append('dog_age', inputs.dog_age);
        formData.append('location', inputs.location);
        formData.append('breed', inputs.breed);
        formData.append('dog_sex', inputs.dog_sex);
        formData.append('bio', inputs.bio);
        formData.append('interests', inputs.interests);
        if (profilePicture) {
            formData.append('profile_picture', profilePicture);
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            navigate("/login");
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || 'Error completing signup.'}`);
        }
    }

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#30598a" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3">
                            {step === 1 && (
                                <>
                                    <img 
                                        src="https://www.dogster.com/wp-content/uploads/2024/03/owner-petting-happy-dog_Bachkova-Natalia_Shutterstock.jpeg"
                                        className="w-100"
                                        style={{ 
                                            borderTopLeftRadius: ".3rem", 
                                            borderTopRightRadius: ".3rem", 
                                            height: '400px', 
                                            maxHeight: '400px'
                                        }}
                                        alt="Sign Up"
                                    />
                                    <div className="card-body p-4 p-md-5">
                                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Sign Up</h3>
                                        <form className="px-md-2" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
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
                                            <button type="submit" className="btn btn-success btn-lg mb-1" style={{ backgroundColor: "#f1b873", color:"black"}}>Next</button>
                                        </form>
                                    </div>
                                </>
                            )}
                            
                            {step === 2 && (
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Additional Information</h3>
                                    <form className="px-md-2" onSubmit={handleSubmit}>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                {/* Left Column */}
                                                <div className="form-outline mb-4">
                                                    <input 
                                                        type="text" 
                                                        id="dogName" 
                                                        className="form-control" 
                                                        name="dog_name" 
                                                        placeholder="Dog Name" 
                                                        value={inputs.dog_name} 
                                                        onChange={handleChange} 
                                                        required 
                                                    />
                                                    <label className="form-label" htmlFor="dogName">Dog Name <span style={{ color: 'red' }}>*</span></label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input 
                                                        type="text" 
                                                        id="ownerName" 
                                                        className="form-control" 
                                                        name="owner_name" 
                                                        placeholder="Owner Name" 
                                                        value={inputs.owner_name} 
                                                        onChange={handleChange} 
                                                        required 
                                                    />
                                                    <label className="form-label" htmlFor="ownerName">Owner Name <span style={{ color: 'red' }}>*</span></label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input 
                                                        type="text" 
                                                        id="nickName" 
                                                        className="form-control" 
                                                        name="nick_name" 
                                                        placeholder="Nick Name" 
                                                        value={inputs.nick_name} 
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-label" htmlFor="nickName">Nick Name</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input 
                                                        type="number" 
                                                        id="dogAge" 
                                                        className="form-control" 
                                                        name="dog_age" 
                                                        placeholder="Dog Age" 
                                                        value={inputs.dog_age} 
                                                        onChange={handleChange} 
                                                        required 
                                                    />
                                                    <label className="form-label" htmlFor="dogAge">Dog Age <span style={{ color: 'red' }}>*</span></label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input 
                                                        type="text" 
                                                        id="location" 
                                                        className="form-control" 
                                                        name="location" 
                                                        placeholder="Location" 
                                                        value={inputs.location} 
                                                        onChange={handleChange} 
                                                        required 
                                                    />
                                                    <label className="form-label" htmlFor="location">Location <span style={{ color: 'red' }}>*</span></label>
                                                </div>
                                                <div className="form-outline mb-4 d-flex align-items-center">
                                                    <div className="image-preview d-flex align-items-center">
                                                        {preview ? (
                                                            <div className="position-relative">
                                                                <img src={preview} alt="Profile Preview" className="img-preview" />
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0" 
                                                                    onClick={handleRemovePicture}
                                                                    aria-label="Remove picture"
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="placeholder-preview">
                                                                <p>Upload Picture</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ms-3">
                                                        <input 
                                                            type="file" 
                                                            id="profilePicture" 
                                                            className="form-control visually-hidden" 
                                                            name="profile_picture" 
                                                            onChange={handleFileChange}
                                                        />
                                                        <label className="btn btn-primary" htmlFor="profilePicture">Upload</label>
                                                        <label className="form-label visually-hidden" htmlFor="profilePicture">Profile Picture</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                {/* Right Column */}
                                                <div className="form-outline mb-4">
                                                    <input 
                                                        type="text" 
                                                        id="breed" 
                                                        className="form-control" 
                                                        name="breed" 
                                                        placeholder="Breed" 
                                                        value={inputs.breed} 
                                                        onChange={handleChange} 
                                                        required 
                                                    />
                                                    <label className="form-label" htmlFor="breed">Breed <span style={{ color: 'red' }}>*</span></label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <select 
                                                        id="dogSex" 
                                                        className="form-control" 
                                                        name="dog_sex" 
                                                        value={inputs.dog_sex} 
                                                        onChange={handleChange}
                                                        required 
                                                    >
                                                        <option value="">Select Sex</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                    <label className="form-label" htmlFor="dogSex">Dog Sex <span style={{ color: 'red' }}>*</span></label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <textarea 
                                                        id="bio" 
                                                        className="form-control" 
                                                        name="bio" 
                                                        placeholder="Bio" 
                                                        value={inputs.bio} 
                                                        onChange={handleChange}
                                                        rows="4"
                                                    />
                                                    <label className="form-label" htmlFor="bio">Bio</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <textarea 
                                                        id="interests" 
                                                        className="form-control" 
                                                        name="interests" 
                                                        placeholder="Interests" 
                                                        value={inputs.interests} 
                                                        onChange={handleChange}
                                                        rows="4"
                                                    />
                                                    <label className="form-label" htmlFor="interests">Interests</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <button type="button" className="btn btn-success" style={{ backgroundColor:"#f1b873", color:"black"}} onClick={handlePrevious}>Previous</button>
                                            <button type="submit" className="btn btn-success" style={{ backgroundColor: "#f1b873", color: "black"}}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
