

import AddChannel from '../management/AddChannel';
import TableHeaderNavigation from '../../components/Navigations/TableHeaderNavigation';
import TableRow from '../TablesContent/TableRow';
import TableHeader from '../TablesContent/TableHeader';
import BackButton from '../../components/Buttons/BackButton';
const AgencyChannels = ({data}) => {

  const formattedDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    return formatted;
  };
  
  return (

    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm sm:p-6 ">
          <div className="flex flex-row justify-between">
          </div>
          <table className="mt-2 w-full text-sm text-left  ">
                    <thead className="text-xs  uppercase bg-gray-50  ">
                    <TableHeader data={data}/>
                    </thead>
                    <tbody className="">
                    {data.channels.map((channel) => (
                    <TableRow  data={channel} formattedDate={formattedDate}/>
                    ))}
                  </tbody>
                </table>
        </div>
      </div>
    </>
  )

}

export default AgencyChannels



