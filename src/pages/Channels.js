import React, { useState, useEffect } from 'react';
import agencyApi from "../api/agency";
import { useSelector } from 'react-redux';
import AddChannel from '../agency/management/AddChannel';
import AgencyChannels from '../agency/view/AgencyChannels';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function BroadcastPage() {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Set loading to true when the request starts
    setLoading(true);
  
    // Fetch agency members when the component mounts
    agencyApi.channels({
      headers: {
        Authorization: `Bearer ${user.user.authToken}`,
      },
    })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching agency members:", error);
      })
      .finally(() => {
        // Set loading to false regardless of success or failure
        setLoading(false);
      });
  }, [user.user.authToken]);

  if (!data.channels || data.channels.length === 0) {
    return (
      <div className="p-4 sm:ml-64 " style={{ height: '100vh' }}>
        <div className="">
                    <BackButton />
                </div>
        <div className='m-2 flex flex-row justify-between'>
          <div>
            <BackButton />
          </div>
          <div>
          <AddChannel />

          </div>
        </div>
        <div className='flex flex-row gap-1'>
        <span className="ml-4">No channels available</span>, <Link to="/tours">Please create a Tour first </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:ml-64 flex flex-col " style={{ height: '100vh' }}>
      <div>
      <div className='flex flex-row justify-between '>
          <div>
            <BackButton />
          </div>
          <div>
          <AddChannel />

          </div>
        </div>
      </div>
       {loading ? (
        <Loader />
      ) : (
        <><div className='m-2'>
          </div><AgencyChannels data={data} /></>
      )}
      
    </div>
  );
}
