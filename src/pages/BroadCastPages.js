import React, {useState, useEffect} from 'react';
import agencyApi from "../api/agency";
import { useSelector } from 'react-redux';
import AddChannel from '../agency/AddChannel';




export default function BroadcastPages(){

  const user = useSelector(state => state.user);
  const [data, setData] = useState([]);

  
    useEffect(() => {
      // Fetch agency members when the component mounts
      agencyApi.channels({
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      })
        .then((response) => {
          setData(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching agency members:", error);
        });
    }, [user.user.authToken]);


    if (!data.channels || data.channels.length === 0) {
      // console.log('No tour data available.');
      return null; // Return null or a message when there is no tour data
    }

    console.log(data.channels)
  
  
    return (
      <div className="p-4 sm:ml-64 " style={{ height: '100vh' }}>
        <h1>Something</h1>
      </div>
    )
}