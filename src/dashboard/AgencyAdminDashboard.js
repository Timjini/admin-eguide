import React, { useState } from 'react';
import Example from '../components/dashboard/Charts/Example';
import { useSelector } from 'react-redux';
import useGetGuides from '../hooks/useGetGuides';
import Loader from '../components/Loaders/Loader';
import GuidesList from '../agency/ui/GuidesList';
import useGetTours from '../hooks/useGetTours';
import DashboardGuidesStats from '../agency/ui/DashboardGuidesStats';
import useGetGuidesCount from '../hooks/useGetGuidesCount';

const AgencyAdminDashboard = ({ user }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const {guides ,loading:guidesLoading, error, refetch } = useGetGuides();
  const {agencyData} = useGetGuidesCount();
  console.log("agency data", agencyData)
  // const {tours , loading: toursLoading, error: toursError, refetch: refetchTours} = useGetTours();

  if (guidesLoading) {
    return <Loader/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Ensure guides is an array before mapping over it
  if (!Array.isArray(guides)) {
    console.error('Invalid guides data format:', guides);
    return <p>Error: Invalid guides data format</p>;
  }

  return (
    <div className='content-wrapper'>
      
        <DashboardGuidesStats count={agencyData} />

      <div className="p-4 flex flex-row flex-wrap mx-auto ml-4 md:ml-48 gap-12 ">
         <Example />
          <GuidesList data={guides}/>
      </div>

      <div className="p-4 flex flex-row flex-wrap mx-auto ml-4 md:ml-48 gap-20" >
      <button onClick={refetch}>
      <span class="material-symbols-outlined">
      refresh
      </span>
      </button>
      </div>
    </div>
  

  );
};

export default AgencyAdminDashboard;
