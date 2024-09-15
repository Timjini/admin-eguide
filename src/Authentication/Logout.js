import React from 'react';
import { useDispatch, useSelector } from'react-redux';
import { clearUser } from '../redux/userSlice';
import axios from 'axios';
import {API_ROOT} from '../constant/index';


export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); 
    
    const handleLogOut = (event) => {
      axios.post(`${API_ROOT}/auth/logout`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(response => {
      })
      .catch(error => {
        console.log(error);
      });
      localStorage.removeItem('token');
      window.location.href = '/';
      dispatch(clearUser());
    }

  return (
    <div>
      <button onClick={handleLogOut} className=' thirdBtn flex flex-row justify-center content-center px-3 py-2 mb-3 mr-3 text-sm font-medium text-center '>
      <span className="material-symbols-outlined">
        logout
        </span>
      <span className="block xs:hidden sm:hidden md:hidden lg:block xl:block">
        Log Out
      </span>        
      </button>
    </div>
  );
}
