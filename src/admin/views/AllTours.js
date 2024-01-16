import React,{useState, useEffect} from 'react';
// import {agencyApi} from './agencyApi';
import {API_PUBLIC_FOLDER, API_USER_IMAGE} from '../../constant/index';

const AllTours = ({data}) => {
    const [tours, setTours] = useState(data);

  useEffect(() => {
    setTours(data.tours);
    console.log("Data: ", data.tours);
  }, [data.tours]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map(tour => (
                <td>
                   
                        {tour.title}

                </td>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllTours;