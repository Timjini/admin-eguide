import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../Authentication/Logout';
import { HEADERS , API_USER_DATA } from '../constant';

export default function Dashboard(props) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .post(
        API_USER_DATA,
        {},
        {
          headers: {
            ...HEADERS,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);

        setUserData(res.data.user);
        setIsLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>

    {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
            <div>
              <h2>User Details</h2>
              <p>Name: {userData.avatar}</p>
              <p>Email: {userData.email}</p>
              <img src={`http://localhost:4000/uploads/${userData.avatar}`} alt="User Avatar" />
            <Logout />
            </div>
            </>
          )}

    </div>
  );
}
