import * as React from 'react';
import { useState } from'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import authenticationApi from '../api/authentication';
import { setUser } from '../redux/userSlice';
import { useDispatch , useSelector } from 'react-redux';
import Alert from '../components/Alerts/Alert';


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

// const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate(); // Get the navigate functiont
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [alertData, setAlertData] = useState(null);

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
            setAlertData({ message: res.data, status: 'success' });
          } else {
            setError(res.data.error);
            setAlertData({ message: res.data, status: 'error' });
          }
        })
        .catch(err => {
          console.log(err);
          setError(error);
          setAlertData({ message: "Please check your credentials", status: 'error' });
        });
      }
      

  return (
    <>
    <Alert
        message={alertData?.message}
        status={alertData?.status}
        onClose={() => setAlertData(null)} // Clear alertData when the alert is closed
      />

      <section className="navigation" >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold ">
            <h1 className='text-5xl '> E-Guide Solutions</h1>    
          </a>
          <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                  <input type="email" name="email" id="email" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} required  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium  hover:underline ">Forgot password?</a>
                </div>
                <button type="submit" className="primaryBtn w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                <p className="text-sm font-light">
                  Don’t have an account yet? <a href="#" className=" hidden">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}