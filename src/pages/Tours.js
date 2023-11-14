import React, { useEffect, useState } from 'react';
import { useSelector } from'react-redux';
import agencyApi from "../api/agency";
import Tour from "../agency/tours";



export default function Tours(props) {
  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);

  
    useEffect(() => {
      // Fetch agency members when the component mounts
      agencyApi.tours({
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      })
        .then((response) => {
          setData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching agency members:", error);
        });
    }, [user.user.authToken]);



  return (  
  <div className="p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900" style={{height:'100vh'}}>
      <section className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h2 className='py-5 text-xl text-gray-700 dark:text-white'>TOURS</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          <Tour data={data} />
        </section>
    </section>
  </div>
  );
}
