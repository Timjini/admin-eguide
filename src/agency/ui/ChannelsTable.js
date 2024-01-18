import TableHeaderNavigation from '../../components/Navigations/TableHeaderNavigation';
import TableRow from '../TablesContent/TableRow';
import TableHeader from '../TablesContent/TableHeader';
import {API_PUBLIC_FOLDER} from '../../constant/index';

const ChannelsTable = ({data}) => {

    const headerItems = new Set(['Channel Name', 'Starting Date & Time', 'Ending Date', 'Channel Code', 'Guide', 'Status']);


  const formattedDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    return formatted;
  };

    return (

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
                     Channel Name
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
                     Starting Date
                  </th>
                  <th
                     scope="col"
                     className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                     >
                     Ending Date
                  </th>
                  <th
                     scope="col"
                     className="p-4 text-xs font-medium tracking-wider text-left  uppercase "
                     >
                     
                  </th>
               </tr>
            </thead>
            <tbody className="">
               {data.channels.map((channel ,index) => (
               <tr key={index}>
                  <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                     <div className='flex flex-row gap-2 content-center'>
                        {/* <img className="w-8 h-8 rounded-full" src={`${API_PUBLIC_FOLDER}${channel.image}`}  /> */}
                        <span>{channel.name}{" "}</span>
                     </div>
                  </td>
                  <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                     {channel.description}
                  </td>
                  <td className="p-4 text-sm font-semibold  whitespace-nowrap ">
                     {channel.starting_date ? formattedDate(channel.starting_date) : '-'}
                  </td>
                  <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                     {channel.ending_date ? formattedDate(channel.ending_date) : '-'}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                            <button
                            className=""
                            id={channel._id}
                            // onClick={() => handleViewUser(member._id)}
                          >
                            <span class="material-symbols-outlined">
                            visibility
                            </span>
                          </button> 
                            <button
                            className=""
                            id={channel._id}
                            // onClick={() => handleEditUser(member._id)}
                          >
                            <span class="material-symbols-outlined">
                            edit
                            </span>
                          </button>
                          </td>
               </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>

      

    )
}

export default ChannelsTable;