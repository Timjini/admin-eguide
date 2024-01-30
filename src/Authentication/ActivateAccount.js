import React, {useState, useEffect} from 'react';
import Alert from '../components/Alerts/Alert';
import authenticationApi from '../api/authentication';
import { setUser } from '../redux/userSlice';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const ActivateAccount = () => {
  const navigate = useNavigate(); // Get the navigate functiont
  const location = useLocation();
  const [token, setToken] = useState('');
  const [alertData, setAlertData] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extract the token from the query parameter when the component mounts
    const queryParams = new URLSearchParams(location.search);
    const tokenFromQuery = queryParams.get('token');

    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, [location.search]);

  console.log(token)


  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch({user});

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (field === 'password') {
      setPassword(value);
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);
    }

    // Check if passwords match on each change
    setPasswordsMatch(password === confirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    authenticationApi.activateAccount({
        password: password,
        token: token,
      })
      .then(res => {
        console.log('Response from the backend:', res.data); // Log the entire response data
        if (res.data) {   
          // setUserData(res.data.user);
          // dispatch(setUser(res.data.user));
          // console.log(dispatch(setUser(res.data.user)));
          // store token in session
          localStorage.setItem('token', res.data.authToken);
          console.log(res.data.authToken);
          // localStorage.setItem('user', res.data.user);
          if (res.data.user.type === 'owner'){
          navigate('/activate-account/create_agency');  
          } else {
          localStorage.removeItem('token');
            navigate('/');
          }
          setAlertData({ message: res.data, status: 'success' });
        } else if (res.status === '400'){
            setAlertData({ message: res.data, status: 'error' });
        }
         else {
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
                    Activate your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">
                            Password
                            </label>
                            <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={password}
                                onChange={(e) => handleChange(e, 'password')}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
                            Confirm Password
                            </label>
                            <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            className={`border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!passwordsMatch ? 'wrong-pass' : ''}`}
                            value={confirmPassword}
                            onChange={(e) => handleChange(e, 'confirmPassword')}
                            required
                            />
                        </div>
                        <button
                            type="submit"
                            className="primaryBtn w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Confirm
                        </button>
                        </form>
                </div>
              </div>
            </div>
          </section>
        </>
      );
}

export default ActivateAccount;