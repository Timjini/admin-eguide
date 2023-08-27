import React, { useState } from 'react';

const SignUpForm = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('username', username);
      formData.append('avatar', avatar); // Append the avatar file to the form data

      await onSignUp(formData);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label htmlFor="phone">Phone</label>
      <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <label htmlFor="username">Username</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setAvatar(e.target.files[0])} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
