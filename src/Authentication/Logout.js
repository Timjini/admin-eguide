import React from 'react';
import authenticationApi from '../api/authentication';
import { HEADERS } from '../constant';
import { useDispatch, useSelector } from'react-redux';
import { clearUser } from '../redux/userSlice';
import axios from 'axios';


export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); 
  console.log(user.user.authToken);
    
    const handleLogOut = async () => {
        // const response = await axios.post(('http://localhost:4000/api/users/logout'),
        //   {
        //     headers:  {            
        //       Authorization: `Bearer ${user.user.authToken}`,
        //     }
        //   }
        // );
        // if (response.status === 200) {
        //     localStorage.removeItem('token');
        //     window.location.href = '/';
        //     dispatch(clearUser());
        // }
        dispatch(clearUser());
        localStorage.removeItem('token');
        window.location.href = '/';
    }

  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
