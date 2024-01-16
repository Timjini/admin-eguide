import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };

  return (
    <button onClick={handleGoBack} className=''>
      <span className="material-symbols-outlined backBtn">undo</span>
    </button>
  );
};

export default BackButton;
