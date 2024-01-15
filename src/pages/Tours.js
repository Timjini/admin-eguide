import React, { useEffect, useState } from 'react';
import { useSelector } from'react-redux';
import agencyApi from "../api/agency";
import Tour from "../agency/views/tours";
import Loader from '../components/Loader';
import AddTour from '../agency/management/AddTour';




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

  console.log(data);

  return (  
    <>
    <div className='playground'>
      <div className="p-4 flex flex-col content-wrapper" style={{ height: '100vh' }}>
        <AddTour />
          {loading ? (
            <Loader />
          ) : (
            <Tour data={data} />
          )}
        </div>
    </div>
        </>
  );
}
