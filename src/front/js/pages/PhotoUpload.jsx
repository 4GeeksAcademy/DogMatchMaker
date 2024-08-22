import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

export const PhotoUpload = () => {
  const { actions } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Generate preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    console.log("File selected: ", file);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;
    setUploading(true);

    // Call the handleUpload action
    await actions.handleUpload(selectedFile);

    // Clear the preview and reset the state
    setPreviewUrl(null);
    setSelectedFile(null);
    setUploading(false);
  };

  return (
    <div className="photo-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div className="preview">
          <img src={previewUrl} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />
        </div>
      )}
      <button
        onClick={handleUploadClick}  // Corrected the function name here
        disabled={!selectedFile || uploading}
        className="btn btn-primary mt-2"
      >
        {uploading ? 'Uploading...' : 'Upload Photo'}
      </button>
    </div>
  );
};
