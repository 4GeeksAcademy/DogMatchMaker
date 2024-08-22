import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { EditProfileModal } from './EditProfileModal.jsx';
import { PhotoUpload } from './PhotoUpload.jsx';
import { UserPhotos } from './UserPhotos .jsx';

export const UserProfile = () => {
  const { store, actions } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('Current store data:', store);

  // Handle the color change
  const handleColorChange = (event) => {
    actions.setBackgroundColor(event.target.value);
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-9 col-xl-8">
            <div className="card">
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: store.backgroundColor, height: '200px' }}
              >
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <img
                    src={store.profilePicture || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
                    alt="Profile"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: '150px', zIndex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-dark text-body"
                    style={{ zIndex: 1 }}
                    onClick={openModal}
                  >
                    Edit profile
                  </button>

                  {/* Color Picker */}
                  <input
                    type="color"
                    id="bgColorPicker"
                    className="mt-2"
                    value={store.backgroundColor || '#000'}
                    onChange={handleColorChange}
                    style={{
                      zIndex: 1,
                      width: '50px',
                      height: '80px',
                      padding: '5px',
                      borderRadius: '10px'
                    }}
                  />

                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5 className="full name">{store.fullName || 'Andy Horwitz'}</h5>
                  <p className="location">{store.location || 'New York'}</p>
                </div>
              </div>

              <div className="p-4 text-black bg-body-tertiary">
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">253</p>
                    <p className="small text-muted mb-0">Photos</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">1026</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">478</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                </div>
              </div>

              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4 bg-body-tertiary Bio">
                    <p className="font-italic mb-1">{store.bio}</p>
                  </div>
                </div>

                {/* Photo Upload Section */}
                <PhotoUpload />

                {/* User Photos Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">Recent photos</p>
                  <p className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </p>
                </div>

                <UserPhotos />

              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};
