import Example from '../components/dashboard/Charts/Example';
import useGetAdminDashboardData from '../hooks/useGetAdminDashboardData';
import Loader from '../components/Loaders/Loader';

const AdminDashboard = ({user}) => {
  const {dashboardData, loading, error} = useGetAdminDashboardData();

  if(loading){
    return <Loader/>
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
              {dashboardData.data.guideCount}
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
            {dashboardData.data.tourCount}
            </h5>
            </div>
            <span className="material-symbols-outlined dahboard_icon">
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
            {dashboardData.data.touristCount}
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


      <div className="p-4 flex flex-row flex-wrap mx-auto ml-4 md:ml-48 gap-10 ">
         <Example />
         <a
            href="#"
            className="block w-1/3 p-6  border  rounded-lg shadow hidden"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight ">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal ">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in
              reverse chronological order.
            </p>
          </a>
      </div>
    </div>
    );
  }
  
  export default AdminDashboard;