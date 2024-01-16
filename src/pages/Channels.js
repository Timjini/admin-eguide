import React, { useState, useEffect } from 'react';
import agencyApi from "../api/agency";
import { useSelector } from 'react-redux';
import AddChannel from '../agency/management/AddChannel';
import AgencyChannels from '../agency/views/AgencyChannels';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function BroadcastPage() {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { agencyId: routeAgencyId } = useParams();

 
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await agencyApi.channels({
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          },
          params: {
            agencyId: routeAgencyId
          }
        });

        setData(response.data);
      } catch (error) {
        console.error("Error fetching agency channels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [user.user.authToken, routeAgencyId]);

  

  if (!data.channels || data.channels.length === 0) {
    return (
      <div className="content-wrapper" >
        <div className='flex flex-col mt-24 mx-auto justify-center items-center'>
          <Loader/>
          <span>Please contact the administrator</span>
        </div>
      </div>
    );
  }

  return (
      <div className='content-wrapper'>
        <div className="p-4 flex flex-col" >
          <div>
            <AddChannel />
          </div>
            {loading ? (
              <Loader />
            ) : (
              <div className=''>
              <AgencyChannels data={data} />
              </div>
            )}
          </div>
      </div>
    );
      
}
