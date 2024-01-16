import React from 'react';
import SignUpForm from './SignUpForm';
import axios from 'axios';
// import Box from '@mui/material/Box';
// import Item from '@mui/material/ListItem';
import { API_ROOT } from '../constant';

const UserManagement = () => {
  const handleSignUpAndUpload = async (userData) => {
    try {
      const signUpResponse = await axios.post(`${API_ROOT}/api/users/sign_up`, userData);
      console.log('Sign Up Response:', signUpResponse.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
      <div className='sign-up-container'>
        <div>
          <SignUpForm onSignUp={handleSignUpAndUpload} />
        </div>
        <div className='hero-img'>
          <img src='/images/home.jpg' alt='e-guide' />
        </div>
      </div>
  );
};

export default UserManagement;
