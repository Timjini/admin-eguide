
import BackButton from "../../components/Buttons/BackButton";
import AddTour from "../../agency/management/AddTour";


const Agencies = ({agencies})=> {
    const headerItems = new Set(['Channel Name', 'Starting Date & Time', 'Ending Date', 'Channel Code', 'Guide', 'Status']);


    const formattedDate = (dateString) => {
      const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
      return formatted;
    };


    const channelRows = agencies.data.agencies.length === 0 ? (
      <tr>
      <td colSpan={headerItems.size} className="p-4">No Agency available</td>
    </tr>
    ) : (
      agencies.data.agencies.map((agency, index) => (
         <tr key={index}>
           {/* Render your table cells here */}
           <td className="p-4 text-sm">{agency.name}</td>
           <td className="p-4 text-sm">{agency.description}</td>
           <td className="p-4 text-sm"> {agency.members.length}</td>
           <td className="p-4 text-sm">{agency.owner}</td>
         </tr>
       ))

    );


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
                              Agency Name
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
                              Agency Owner
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
         </div>
    )
}


export default Agencies;