import React, { useEffect, useState } from "react";
import Members from "../agency/members";
import agencyApi from "../api/agency";
import { useSelector } from 'react-redux';


const Agency = () => {
  const [membersData, setMembersData] = useState([]);
  const user = useSelector(state => state.user);
  console.log(user);

  useEffect(() => {
    // Fetch agency members when the component mounts
    agencyApi.members({
      headers: {
        Authorization: `Bearer ${user.user.authToken}`,
      },
    })
      .then((response) => {
        setMembersData(response.data.members);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching agency members:", error);
      });
  }, [user.user.authToken]);

  return (
    <>
      <div className="p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900" style={{height:'100vh'}}>
        <Members data={membersData} />
      </div>
    </>
  );
};

export default Agency;
