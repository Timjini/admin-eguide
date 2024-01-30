import TableHeaderNavigation from '../../components/Navigations/TableHeaderNavigation';
import TableRow from '../TablesContent/TableRow';
import TableHeader from '../TablesContent/TableHeader';
import {API_PUBLIC_FOLDER} from '../../constant/index';

const ChannelsTable = ({channelsData}) => {

    const headerItems = new Set(['Channel Name', 'Starting Date & Time', 'Ending Date', 'Channel Code', 'Guide', 'Status']);

    console.log("here is the Channels Table", channelsData.data.channels.length)

    const formattedDate = (dateString) => {
      const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
      return formatted;
    };

    const channelRows = channelsData.data.channels.length === 0 ? (
      <tr >
      <td colSpan={headerItems.size} className='p-4'>No channels available</td>
      </tr>
    ) : (
       channelsData.data.channels.map((channel, index) => (
         <tr key={index}>
           {/* Render your table cells here */}
           <td className="p-4 text-sm">{channel.channelName}</td>
           <td className="p-4 text-sm">{channel.code}</td>
           <td className="p-4 text-sm"> {channel.ending_date ? formattedDate(channel.ending_date) : '-'}</td>
           <td className="p-4 text-sm">{channel.tour.title}</td>
         </tr>
       ))
    );


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
                     Code
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
                     Related Tour
                  </th>
               </tr>
            </thead>
            <tbody className="">
               {channelRows}
            </tbody>
         </table>
      </div>
    </div>

      

    )
}

export default ChannelsTable;