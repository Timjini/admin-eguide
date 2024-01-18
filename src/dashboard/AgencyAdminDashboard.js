import React, { useState } from 'react';
import Example from '../components/dashboard/Charts/Example';
import { useSelector } from 'react-redux';
import useGetGuides from '../hooks/useGetGuides';
import Loader from '../components/Loaders/Loader';
import GuidesList from '../agency/ui/GuidesList';
import useGetTours from '../hooks/useGetTours';

const AgencyAdminDashboard = ({ user }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const {guides ,loading:guidesLoading, error, refetch } = useGetGuides();
  // const {tours , loading: toursLoading, error: toursError, refetch: refetchTours} = useGetTours();

  console.log("useTours guides ", guides)
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
      <div className="p-4 flex flex-row flex-wrap mx-auto ml-4 md:ml-48 gap-20" >
        <a
          href="#"
          className="block w-1/4 h-36 p-6  border  rounded-lg shadow "
        >
          <div className="flex flex-row justify-between items-center	 dahboard_card_content">
            <div>
            <h5 className="mb-2 text-4xl font-bold tracking-tight ">
              37
            </h5>
            </div>
            <span className="material-symbols-outlined dahboard_icon">
                airport_shuttle
              </span>
          </div>
          <span className="font-medium ">
            Active Guides
          </span>
        </a>

        <a
          href="#"
          className="block w-1/4 h-36 p-6  border  rounded-lg shadow "
        >
          <div className="flex flex-row justify-between items-center	 dahboard_card_content">
            <div>
            <h5 className="mb-2 text-4xl font-bold tracking-tight ">
              37
            </h5>
            </div>
            <span class="material-symbols-outlined dahboard_icon">
            your_trips  
            </span>
          </div>
          <span className="font-medium  ">
            Current Trips
          </span>
        </a>
        <a
          href="#"
          className="block w-1/4 h-36 p-6  border  rounded-lg shadow "
        >
          <div className="flex flex-row justify-between items-center	 dahboard_card_content">
            <div>
            <h5 className="mb-2 text-4xl font-bold tracking-tight ">
              37
            </h5>
            </div>
            <span className="material-symbols-outlined dahboard_icon">
                map
              </span>
          </div>
          <span className="font-medium ">
            Current Travelers
          </span>
        </a>
      </div>


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
