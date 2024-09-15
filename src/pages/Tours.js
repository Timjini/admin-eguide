import React, { useEffect, useState } from 'react';
import { useSelector } from'react-redux';
import agencyApi from "../api/agency";
import AgencyTours from "../agency/views/AgencyTours";
import Loader from '../components/Loaders/Loader';
import AddTour from '../agency/management/AddTour';
import { useParams } from 'react-router-dom';
import AllTours from '../admin/views/AllTours';
import BackButton from '../components/Buttons/BackButton';
import useGetTours from '../hooks/useGetTours';
import ToursTable from '../agency/ui/ToursTable';
import MainDrawer from '../components/OffCanvas/MainDrawer';





export default function Tours(props) {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);

  const { agencyId } = useParams();
  const { tours, loading, error, refetch } = useGetTours(agencyId);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }



  return (  
    <>
      <div className="p-4 flex flex-col content-wrapper">
        {user.user.type === 'admin' ? (
          <AllTours tours={data} />
        ) : (
          <>
          <div className='flex flex-row justify-between'>
          <BackButton />
          <MainDrawer activeDrawer="right" additionalComponent={AddTour} title= "Add A Tour" />
          </div>
            {loading ? (
              <Loader />
            ) : (

              <AllTours tours={tours} />
            )}
          </>
        )}
      </div>

        </>
  );
}
