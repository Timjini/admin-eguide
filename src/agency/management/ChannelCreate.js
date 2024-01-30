import React, { useState, useEffect } from 'react';
import useGetGuides from '../../hooks/useGetGuides';
import useGetTours from '../../hooks/useGetTours';
import { useSelector } from 'react-redux';
import agencyApi from '../../api/agency';
import Alert from '../../components/Alerts/Alert';




const ChannelCreate = ({}) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);


  const [channelData, setChannelData] = useState({
    type: 'public',
    guide: '',
    tour: '',
    startingDate: '',
    endingDate: '',
  });
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChannelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const channelDataToSend = {
        guide: channelData.guide,
        tour: channelData.tour,
        agency: user.user.agency._id,
        startingDate: channelData.startingDate,
        endingDate: channelData.endingDate,
        authToken: user.user.authToken,
      };
  
      const response = await agencyApi.addChannel(channelDataToSend, {
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      });
      setData(response.data);
      setAlertData({ message: response.data, status: 'success' });
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  };
    
  const {guides ,loading:guidesLoading, error, refetch } = useGetGuides();
  let agencyId;

if (guides && guides.length > 0) {
  // If guides array is not empty, extract agencyId from the first element
  agencyId = guides[0].agency;
} else {
  // Handle the case when guides array is empty
  console.error("Guides array is empty");
}

const { tours, loading: toursLoading, error: toursError, refetch: refetchTours } = useGetTours(agencyId);

// Check if tours.data.tours exists before mapping over it
const tourOptions = tours.data && tours.data.tours ? (
  tours.data.tours.map((tour, index) => (
    <option key={index} value={tour._id}>
      {tour.title}
    </option>
  ))
) : (
  <option value="">No tours available</option>
);
  
    
    return(
        <>  
          <Alert
            message={alertData?.message}
            status={alertData?.status}
            onClose={() => setAlertData(null)} // Clear alertData when the alert is closed
          />
          <form  onSubmit={handleSubmit} className='p-4 md:p-5 flex flex-col w-96'>
              <div className='py-2 flex flex-col'>
                <div className='flex flex-col mb-2'>
                  <label
                    className='block mb-2 text-sm font-medium '
                  >
                    Guide:
                  </label>
                  <select
                    name="guide"
                    value={channelData.guide}
                    onChange={handleChange}
                    className=' block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md '
                    required
                  >
                    <option value="">Select a guide</option>
                    {/* Mapping through guidesData to create options */}
                    {guides.map((guide) => (
                      <option key={guide._id} value={guide._id}>
                        {guide.user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col p-2'>
                  <label
                    className='block mb-2 text-sm font-medium'
                  >
                    Tour:
                  </label>
                  <select
                    name="tour"
                    value={channelData.tour}
                    onChange={handleChange}
                    className='border border-gray-300  text-sm rounded-lg  block w-full p-2.5 '
                    required
                  >
                    <option value="">Select a Tour</option>
                    {/* Mapping through toursData to create options */}
                    {tourOptions}
                  </select>
                </div>

                <div className='flex flex-col p-2'>
                  <label
                    className='block mb-2 text-sm font-medium  '
                  >
                    Starting Date:
                  </label>
                  <input
                    type="date"
                    name="startingDate"
                    className='border border-gray-300  text-sm rounded-lg w-full p-2.5'
                    value={channelData.startingDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='flex flex-col p-2 mb-5'>
                  <label
                    className='block mb-2 text-sm font-medium  '
                  >
                    Ending Date:
                  </label>
                  <input
                    type="date"
                    name="endingDate"
                    value={channelData.endingDate}
                    onChange={handleChange}
                    className='border border-gray-300  text-sm rounded-lg  block w-full ps-2 p-1 '
                    required
                  />
                </div>
                  {/* add loading */}
                  <div>
                    {loading && (
                    <div className='flex flex-row justify-end'>
                    <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center">
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                      </svg>
                      Loading...
                    </button>
                    </div>
                    )}
                    {!loading && (
                      <div className='mx-auto flex flex-row justify'>
                        <button type="submit" className="primaryBtn font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                          Add A Channel
                        </button>
                      </div>
                    )}

                    </div>
              </div>
          </form>    
        </>
    )
}
export default ChannelCreate;