import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../store/appContext'; 

const Settings = () => {
    const { store } = useContext(Context); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const backendUrl = process.env.BACKEND_URL; 

    if (!backendUrl) {
        console.error('Backend URL is not defined in the environment variables');
        return null;
    }

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                const response = await fetch(`${backendUrl}/api/user`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${store.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to delete account. Status: ${response.status}. Error: ${errorText}`);
                }

                sessionStorage.removeItem('token'); 
                navigate('/');
            } catch (error) {
                setError(`Error deleting account: ${error.message}`);
                console.error(error.message);
            }
        }
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();

        const data = { newEmail };

        try {
            const response = await fetch(`${backendUrl}/api/user/email`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${store.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to update email');
            }

            setEmail(newEmail);
            alert('Email updated successfully');
        } catch (error) {
            setError(`Error updating email: ${error.message}`);
            console.error(error.message);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const data = {
            currentPassword: password,
            newPassword: newPassword
        };

        try {
            const response = await fetch(`${backendUrl}/api/user/password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${store.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            setPassword('');
            setNewPassword('');
            alert('Password updated successfully');
        } catch (error) {
            setError(`Error updating password: ${error.message}`);
            console.error(error.message);
        }
    };

    const formStyle = {
        borderRadius: '1.5rem',
        boxShadow: '10px 10px 15px rgba(202,202,202,0.75)',
        WebkitBoxShadow: '10px 10px 15px rgba(202,202,202,0.75)',
        MozBoxShadow: '10px 10px 15px rgba(202,202,202,0.75)',
        padding: '2rem',
        backgroundColor: '#ffffff', 
        margin: '0 auto'
    };

    return (
        <div className="container-fluid text-center">
            <div className="row justify-content-center mt-4">
                <div className="col-lg-8 col-xl-6">
                    <div className="card p-4" style={formStyle}>
                        <h2 className="mb-4">Account Settings</h2>
                        <button
                            className="btn btn-danger mb-4"
                            style={{ borderRadius: '1.5rem' }}
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                        {error && <div className="alert alert-danger mb-4" role="alert">{error}</div>}
                        <form onSubmit={handleEmailChange} className="mb-4">
                            <div className="form-group">
                                <label htmlFor="newEmail">New Email:</label>
                                <input
                                    type="email"
                                    id="newEmail"
                                    className="form-control"
                                    style={{ borderRadius: '1.5rem' }}
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2" style={{ borderRadius: '1.5rem' }}>Update Email</button>
                        </form>
                        <form onSubmit={handlePasswordChange} className="mb-4">
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password:</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    className="form-control"
                                    style={{ borderRadius: '1.5rem' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="newPassword">New Password:</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className="form-control"
                                    style={{ borderRadius: '1.5rem' }}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2" style={{ borderRadius: '1.5rem' }}>Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
