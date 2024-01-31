import useGetChannels from '../../hooks/useGetChannels';
import Loader from '../../components/Loaders/Loader';
import channelRows from '../../agency/TablesContent/TableRow';
import BackButton from '../../components/Buttons/BackButton';
import MainDrawer from '../../components/OffCanvas/MainDrawer';
import ChannelCreate from '../../agency/management/ChannelCreate';

const AllChannels = () => {
    const { channels, loading, error, refetch } = useGetChannels();
    console.log("adminChannels channels ", channels);
    if (loading) {
        return <Loader/>;
      }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    if (channels.length === 0){
        return <p>No channels found</p>
      }

      const formattedDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
        const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
        return formatted;
      };
   

    return (
    <div className="p-4 flex flex-col content-wrapper">    
        <div className='flex flex-row justify-between'>
            <BackButton />
            {/* <MainDrawer activeDrawer="right" additionalComponent={ChannelCreate} title="Add A Channel" /> */}
        </div>
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
                {channels.data.channels.length === 0 ? (
                  <p className='p-4'>No data available</p> ) : (channels.data.channels.map((channel ,index) => (
                  <tr key={index} id={channel.channelId}>
                     <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                        <div className='flex flex-row gap-2 content-center'>
                           <span>{channel.channelName}{" "}</span>
                        </div>
                     </td>
                     <td className="p-4 text-sm font-normal  whitespace-nowrap ">
                        {channel.participants.length}
                     </td>
                     <td className="p-4 text-sm font-semibold  whitespace-nowrap ">
                        {channel.starting_date ? formattedDate( channel.starting_date) : '-'}
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
                    ))
          )}
                </tbody>
            </table>
        </div>
        </div>
    </div>
    )
}

export default AllChannels;