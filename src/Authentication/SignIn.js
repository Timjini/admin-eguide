import * as React from 'react';
import { useState } from'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import authenticationApi from '../api/authentication';
import { setUser } from '../redux/userSlice';
import { useDispatch , useSelector } from 'react-redux';
import Alert from '../components/Alert';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://e-guidesolutions.com/">
        E-Guide solutions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate(); // Get the navigate functiont
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // const [userData, setUserData] = useState(null);
    const user = useSelector((state)=>state.user);
    const dispatch = useDispatch({user});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
          setEmail(value);
        } else if (name === 'password') {
          setPassword(value);
        }
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticationApi.login({
          email: email,
          password: password
        })
        .then(res => {
          console.log('Response from the backend:', res.data); // Log the entire response data
          if (res.data) {   
            // setUserData(res.data.user);
            dispatch(setUser(res.data.user));
            // console.log(dispatch(setUser(res.data.user)));
            // store token in session
            localStorage.setItem('token', res.data.user.authToken);
            localStorage.setItem('user', res.data.user);
            navigate('/');  
            console.log('Successfully logged in', res.data.user);
          } else {
            setError(res.data.error);
            console.log("error"  + res.data.error);
            alert(res.data.error)
          }
        })
        .catch(err => {
          console.log(err);
          setError(error);
        });
      }
      

  return (
    
    <ThemeProvider theme={defaultTheme}>
      {error && (
       <Alert message={error} />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}