

import TableRow from '../../agency/TablesContent/TableRow';
import {API_USER_IMAGE} from '../../constant/index';

const AllTours = ({tours})=> {
   const headerItems = new Set(['Channel Name', 'Starting Date & Time', 'Ending Date', 'Channel Code', 'Guide', 'Status']);

   
   const formattedDate = (dateString) => {
     const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
     const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
     return formatted;
   };

   // const channelRows = tours.data.tours ? (
   //     tours.data.tours.map((tour, index) => (
   //       <TableRow  data={tour} formattedDate={formattedDate}/>
   //   ))
   // ) : (
   //   <tr>
   //     <td colSpan={headerItems.size}>No tour available</td>
   //   </tr>
   // );


   return (

   <div className="p-4 flex flex-col content-wrapper">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 ">
         <div className="flex flex-row justify-between">
         </div>
         <table className="mt-2 w-full text-sm text-left  ">
            <thead className="text-xs  uppercase shadow ">
               <tr>
                  <th
                     scope="col"
                     className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                     >
                     tour Name
                  </th>
                  <th
                     scope="col"
                     className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                     >
                     Description
                  </th>
                  <th
                     scope="col"
                     className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                     >
                     tour Owner
                  </th>
                  <th
                     scope="col"
                     className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                     >
                     Related Tour
                  </th>
               </tr>
            </thead>
            <tbody className="">
         {tours.data.tours.length === 0 ? (
                  <p className='p-4'>No data available</p> ) : (tours.data.tours.map((tour ,index) => (
                  <tr key={index}>
                     <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                        <div className='flex flex-row gap-2 content-center'>
                           <img className="w-8 h-8 rounded-full" src={`${API_USER_IMAGE}/${tour.photo}`}  />
                           <span>{tour.title}{" "}</span>
                        </div>
                     </td>
                     <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                        {tour.description}
                     </td>
                     <td className="p-4 text-sm font-semibold  whitespace-nowrap ">
                        {tour.starting_date ? formattedDate(tour.starting_date) : '-'}
                     </td>
                     <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                        {tour.ending_date ? formattedDate(tour.ending_date) : '-'}
                     </td>
                     <td className="px-6 py-4 flex gap-2">
                              <button
                              className=""
                              id={tour._id}
                              // onClick={() => handleViewUser(member._id)}
                           >
                              <span className="material-symbols-outlined">
                              visibility
                              </span>
                           </button> 
                              <button
                              className=""
                              id={tour._id}
                              // onClick={() => handleEditUser(member._id)}
                           >
                              <span className="material-symbols-outlined">
                              edit
                              </span>
                           </button>
                     </td>
                  </tr>
                    ))
          )}
            </tbody>
         </table>
      </div>
      </div>
   </div>

     

   )
}


export default AllTours;