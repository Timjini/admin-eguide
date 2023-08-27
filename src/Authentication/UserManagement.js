import React from 'react';
import SignUpForm from './SignUpForm';
import axios from 'axios';

const UserManagement = () => {
  const handleSignUpAndUpload = async (userData) => {
    try {
      const signUpResponse = await axios.post('http://localhost:4000/api/users/sign_up', userData);
      console.log('Sign Up Response:', signUpResponse.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up and Upload Avatar</h2>
      <SignUpForm onSignUp={handleSignUpAndUpload} />
      {/* No need for Upload Avatar section here */}
    </div>
  );
};

export default UserManagement;
