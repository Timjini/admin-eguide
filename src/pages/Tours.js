import React, { useEffect, useState } from 'react';
import { useSelector } from'react-redux';
import agencyApi from "../api/agency";
import Tour from "../agency/tours";
import Loader from '../components/Loader';




export default function Tours(props) {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await agencyApi.tours({
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("Error fetching agency members:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchTours();
  }, [user.user.authToken]);
  
    // useEffect(() => {
    //   // Fetch agency members when the component mounts
    //   agencyApi.tours({
    //     headers: {
    //       Authorization: `Bearer ${user.user.authToken}`,
    //     },
    //   })
    //     .then((response) => {
    //       setData(response.data);
    //       console.log(response);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching agency members:", error);
    //     } } finally {
    //       setLoading(false); // Set loading to false regardless of success or failure
    //     };
    // }, [user.user.authToken]);



  return (  
  <div className="p-4 flex flex-col sm:ml-64 bg-gray-50 dark:bg-gray-900" style={{height:'100vh'}}>
    {loading ? (
            <Loader />
          ) : (
            <Tour data={data} />
          )}
  </div>
  );
}
