import React, { useEffect, useState } from 'react';
import { useSelector } from'react-redux';
import agencyApi from "../api/agency";
import AgencyTours from "../agency/views/AgencyTours";
import Loader from '../components/Loaders/Loader';
import ChannelCreate from '../agency/management/ChannelCreate';
import { useParams } from 'react-router-dom';
import AllTours from '../admin/views/AllTours';
import BackButton from '../components/Buttons/BackButton';
import useGetChannels from '../hooks/useGetChannels';
import ChannelsTable from '../agency/ui/ChannelsTable';
import { Link } from 'react-router-dom';





export default function Channels(props) {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);

  const { agencyId } = useParams();
  const { channels, loading, error, refetch } = useGetChannels(agencyId);

  console.log("useTours Channels ", channels)
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (channels === null || undefined){
    return <p>No channels found</p>
  }



  return (  
    <>
      <div className="p-4 flex flex-col content-wrapper">
        {user.user.type === 'admin' ? (
          <>
           <div className='flex flex-row justify-between'>
          <BackButton />
          <Link to="/agency/channel/create" className='flex items-center gap-3 mb-2 primaryBtn rounded-lg px-4'> 
          Create Channel
          </Link>
        </div>
          <ChannelsTable channelsData={channels} />
          </>
         
        ) : (
          <>
          <div className='flex flex-row justify-between'>
            <BackButton />
            <Link to="/agency/channel/create" className='flex items-center gap-3 mb-2 primaryBtn rounded-lg px-4'> 
            Create Channel
            </Link>
          </div>
            {loading ? (
              <Loader />
            ) : (
              <ChannelsTable channelsData={channels} />
            )}
          </>
        )}
      </div>

        </>
  );
}
