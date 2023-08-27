import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';


const SignUpForm = ({ onSignUp }) => {
  const navigate = useNavigate(); // Get the navigate functiont
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
      navigate('/sign_in')
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <h1>Sign Up</h1>
      <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
        <TextField 
        type="text" 
        id="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
                required
                fullWidth
        label="Email"
        />
        <TextField 
        type="password" 
        id="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
                required
                fullWidth
        label="Password"
        />
        <TextField 
        type="text" 
        id="phone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        margin="normal"
                fullWidth
        label="Phone" />
        <TextField 
        type="text" 
        id="username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        margin="normal"
                fullWidth
        />
        <Button variant="contained" component="label">
          Upload
        <input type="file" hidden accept=".jpg,.jpeg,.png" onChange={(e) => setAvatar(e.target.files[0])} />
        </Button>
        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                  Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpForm;
