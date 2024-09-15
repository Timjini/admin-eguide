import TableHeaderNavigation from '../../components/Navigations/TableHeaderNavigation';
import TableRow from '../TablesContent/TableRow';
import TableHeader from '../TablesContent/TableHeader';
import { API_PUBLIC_FOLDER, API_USER_IMAGE } from '../../constant/index';

const ToursTable = ({ data }) => {
   const headerItems = new Set(['Channel Name', 'Starting Date & Time', 'Ending Date', 'Channel Code', 'Guide', 'Status']);
   const formattedDate = (dateString) => {
      const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
      return formatted;
   };

   return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left ">
            <thead className="text-xs ">
               <tr>
                  <th scope="col" className="px-3 py-2 w-1/6">Tours Name</th>
                  <th scope="col" className="px-3 py-2 w-2/6">Description</th>
                  <th scope="col" className="px-3 py-2 w-1/6">Starting Date</th>
                  <th scope="col" className="px-3 py-2 w-1/6">Ending Date</th>
                  <th scope="col" className="px-3 py-2 w-1/6">Actions</th>
               </tr>
            </thead>
            <tbody>
               {data.tours.length === 0 ? (
                  <tr>
                     <td colSpan="5" className="px-3 py-2 text-center">
                        No data available
                     </td>
                  </tr>
               ) : (
                  data.tours.map((tour, index) => (
                     <tr key={index} className="bg-white border-b ">
                        <td className="px-3 py-2 flex items-center w-1/6">
                           <p className="text-sm font-medium flex items-center">
                              <img className="w-8 h-8 rounded-full mr-2" style={{ width: '32px', height: '32px' }} src={`${API_USER_IMAGE}${tour.photo}`} alt="tour" />
                              <span className='text-center text-gray-700 '>{tour.title}</span>
                           </p>
                        </td>
                        <td className="px-6 py-2 text-sm text-gray-500  w-2/6">
                           {tour.description}
                        </td>
                        <td className="px-6 py-2 text-sm font-semibold text-gray-400  w-1/6">
                           {tour.starting_date ? formattedDate(tour.starting_date) : '-'}
                        </td>
                        <td className="px-6 py-2 text-sm font-semibold text-gray-400  w-1/6">
                           {tour.ending_date ? formattedDate(tour.ending_date) : '-'}
                        </td>
                        <td className="px-3 py-2 flex items-center space-x-2 w-1/6">
                           <button className="text-gray-600 hover:text-blue-900 " id={tour._id}>
                              <span className="material-symbols-outlined">visibility</span>
                           </button>
                           <button className="text-gray-600 hover:text-green-900" id={tour._id}>
                              <span className="material-symbols-outlined">edit</span>
                           </button>
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </div>
   );
};

export default ToursTable;
