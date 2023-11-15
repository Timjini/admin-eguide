import React, { useEffect, useState } from "react";
import Members from "./members";
import agencyApi from "../api/agency";
import { useSelector } from 'react-redux';
import Loader from "../components/Loader";

const MembersList = () => {
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await agencyApi.members({
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          },
        });

        setMembersData(response.data.members);
      } catch (error) {
        console.error("Error fetching agency members:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchMembers();
  }, [user.user.authToken]);

  return (
    <div className="p-4 flex flex-col sm:ml-64 bg-gray-50 dark:bg-gray-900" style={{height:'90vh'}}>
      {loading ? (
        <Loader />
      ) : (
        <Members data={membersData} />
      )}
    </div>
  );
};

export default MembersList;

