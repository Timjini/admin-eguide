import React, { useEffect, useState } from 'react';
import { useSelector } from'react-redux';
import Loader from '../components/Loaders/Loader';
import AllTours from '../admin/views/AllTours';
import BackButton from '../components/Buttons/BackButton';
import useGetTours from '../hooks/useGetTours';
import { Link } from 'react-router-dom';





export default function AdminTours(props) {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);

  // const { agencyId } = useParams();
  const { tours, loading, error, refetch } = useGetTours();

  console.log("adminTours tours ", tours)
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (tours === null || undefined){
    return <p>No tours found</p>
  }



  return (  
    <>
      <div className="p-4 flex flex-col content-wrapper">
        {user.user.type === 'admin' ? (
          <>
           <div className='flex flex-row justify-between'>
          <BackButton />
          {/* <Link to="/agency/create" className='flex items-center gap-3 mb-2 primaryBtn rounded-lg px-4'> 
          Create Agency
          </Link> */}
        </div>
          <AllTours tours={tours} />
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
              <AllTours tours={tours} />
            )}
          </>
        )}
      </div>

        </>
  );
}
