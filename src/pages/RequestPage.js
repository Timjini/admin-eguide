import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authenticationApi from '../api/authentication';
import { setUser } from '../redux/userSlice';
import Alert from '../components/Alerts/Alert';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

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

export default function RequestPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [alertData, setAlertData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangePhone = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data
    const { email, name, phone } = formData;

    // Perform the API call
    authenticationApi.login({
      email,
      name,
      phone,
    })
      .then((res) => {
        if (res.data) {
          dispatch(setUser(res.data.user));
          localStorage.setItem('token', res.data.user.authToken);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/');
          setAlertData({ message: 'Request sent successfully', status: 'success' });
        } else {
          setError(res.data.error);
          setAlertData({ message: res.data.error, status: 'error' });
        }
      })
      .catch((err) => {
        setError(err.message || 'Error occurred');
        setAlertData({ message: 'Please check your credentials', status: 'error' });
      });
  };

  return (
    <>
      <Alert
        message={alertData?.message}
        status={alertData?.status}
        onClose={() => setAlertData(null)} // Clear alertData when the alert is closed
      />

      <section className="navigation">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold">
            <h1 className="text-5xl">E-Guide Solutions</h1>
          </a>
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                Request an Account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">Contact Phone</label>
                  <PhoneInput
                    country="auto"
                    value={formData.phone}
                    onChange={handleChangePhone}
                    enableAreaCodes={true}
                    enableSearch={true}
                    placeholder="Enter your phone number"
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true,
                    }}
                    containerStyle={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Contact Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Contact Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="primaryBtn w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Send a Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Copyright />
    </>
  );
}
