import React from 'react';
import { useDispatch, useSelector } from'react-redux';
import { clearUser } from '../redux/userSlice';
import axios from 'axios';
import {API_ROOT} from '../constant/index';


export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); 
  console.log(user.user.authToken);
    
    const handleLogOut = async () => {
      const response = await axios.post(
        `${API_ROOT}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.user.authToken}`, // Set the Authorization header
          },
        }
      );
        if (response.status === 200) {
            localStorage.removeItem('token');
            window.location.href = '/';
            dispatch(clearUser());
        }
        dispatch(clearUser());
        localStorage.removeItem('token');
        window.location.href = '/';
    }

  return (
    <div>
      <button onClick={handleLogOut} className='px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>Log Out</button>
    </div>
  );
}
