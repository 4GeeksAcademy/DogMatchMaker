import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const UserPhotos = () => {
  const { store } = useContext(Context);

  // Ensure store.photos is initialized and handle undefined case
  const photos = store.photos || [];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="lead fw-normal mb-0">Your Photos</p>
      </div>
      <div className="row g-2">
        {photos.length > 0 ? (
          photos.map((url, index) => (
            <div className="col-6 col-md-3 mb-2" key={index}>
              <div className="position-relative">
                <img src={url} alt={`Photo ${index + 1}`} className="w-100 rounded-3" />
                {/* Delete button functionality can be added here */}
              </div>
            </div>
          ))
        ) : (
          <p>No photos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};
