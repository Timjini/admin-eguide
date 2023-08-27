import React from 'react';
import authenticationApi from '../api/authentication';
import { HEADERS } from '../constant';

export default function Logout() {
    
    const handleLogOut = async () => {
        const response = await authenticationApi.logout(HEADERS);
        if (response.status === 200) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    }

  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
