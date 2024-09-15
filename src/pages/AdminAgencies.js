import React, { useEffect, useState } from 'react';
import { useSelector } from'react-redux';
import agencyApi from "../api/agency";
import AgencyTours from "../agency/views/AgencyTours";
import Loader from '../components/Loaders/Loader';
import ChannelCreate from '../agency/management/ChannelCreate';
import { useParams } from 'react-router-dom';
import AllTours from '../admin/views/AllTours';
import BackButton from '../components/Buttons/BackButton';
import useGetAgencies from '../hooks/useGetAgencies';
import Agencies from '../admin/views/Agencies';
import { Link } from 'react-router-dom';
import  KpiCreationForm  from '../admin/views/DrawerWithForm';
import MainDrawer from '../components/OffCanvas/MainDrawer';
import AddChannel from '../agency/management/AddChannel';




export default function AdminAgencies(props) {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);

  // const { agencyId } = useParams();
  const { agencies, loading, error, refetch } = useGetAgencies();

  console.log(agencies);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (agencies === null || undefined){
    return <p>No agencies found</p>
  }



  return (  
    <>
      <div className="p-4 flex flex-col content-wrapper">
        {user.user.type === 'admin' ? (
          <>
           <div className='flex flex-row justify-between'>
          <BackButton />
        </div>
          <Agencies agencies={agencies} />
          </>
         
        ) : (
          <>
          <div className='flex flex-row justify-between'>
            <BackButton />
            <MainDrawer activeDrawer="right" additionalComponent={AddChannel} title="Add Channel"/>
          </div>
            {loading ? (
              <Loader />
            ) : (
              <Agencies agencies={agencies} />
            )}
          </>
        )}
      </div>

        </>
  );
}
