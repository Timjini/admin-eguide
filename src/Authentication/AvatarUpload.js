// AvatarUpload.js
import React, { useState } from 'react';

const AvatarUpload = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onUpload(selectedFile);
  };

  return (
    <div>
      <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default AvatarUpload;
