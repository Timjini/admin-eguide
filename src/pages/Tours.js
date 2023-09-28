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
  <div className="p-4 sm:ml-64">
      <section className="container mx-auto p-10 md:py-20 px-5 md:p-10">
        <h2 className='mt-2 py-5 text-4xl text-gray-700'>TOURS</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          <Tour data={data} />
        </section>
    </section>
  </div>
  );
}
