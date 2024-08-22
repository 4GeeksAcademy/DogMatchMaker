import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { store, actions } = useContext(Context);
  const [profileData, setProfileData] = useState({
    profilePicture: '',
    fullName: '',
    location: '',
    bio: '',
  });

  useEffect(() => {
    if (isOpen) {
        setProfileData({
        profilePicture: store.profilePicture || '',
        fullName: store.fullName || '',
        location: store.location || '',
        bio: store.bio || '',
      });
    }
  }, [isOpen, store]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting profile data:', profileData); // Debugging log
    actions.updateProfile(profileData);
    
    onClose();
  };

  return (
    isOpen && (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="profilePicture" className="form-label">Profile Picture URL</label>
                  <input
                    type="text"
                    id="profilePicture"
                    name="profilePicture"
                    className="form-control"
                    value={profileData.profilePicture}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-control"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    value={profileData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="form-control"
                    value={profileData.bio}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
