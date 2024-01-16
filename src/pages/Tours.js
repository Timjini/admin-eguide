import React, { useEffect, useState } from 'react';
import { useSelector } from'react-redux';
import agencyApi from "../api/agency";
import Tour from "../agency/views/tours";
import Loader from '../components/Loader';
import AddTour from '../agency/management/AddTour';
import { useParams } from 'react-router-dom';
import AllTours from '../admin/views/AllTours';
import BackButton from '../components/BackButton';





export default function Tours(props) {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { agencyId: routeAgencyId } = useParams();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await agencyApi.tours({
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          },
          params: {
            agencyId: routeAgencyId
          }
        });
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Tours channels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [user.user.authToken, routeAgencyId]);

console.log("user " , data)

  return (  
    <>
    <div className=''>
      <div className="p-4 flex flex-col content-wrapper">
        {user.user.type === 'admin' ? (
          <AllTours data={data} />
        ) : (
          <>
          <div className='flex flex-row justify-between'>
          <BackButton />
          <AddTour />
          </div>
            {loading ? (
              <Loader />
            ) : (

              <Tour data={data} />
            )}
          </>
        )}
      </div>
    </div>

        </>
  );
}
