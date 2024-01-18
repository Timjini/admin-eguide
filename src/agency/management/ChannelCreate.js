import React, { useState, useEffect } from 'react';
import useGetGuides from '../../hooks/useGetGuides';
import useGetTours from '../../hooks/useGetTours';
import { useSelector } from 'react-redux';
import agencyApi from '../../api/agency';
import BackButton from '../../components/Buttons/BackButton';



const ChannelCreate = ({}) => {
  const user = useSelector((state) => state.user);
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
      window.location.reload();
      alert('Channel added successfully');
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
        <div className='content-wrapper'>
          <BackButton />
          <div className="p-4 flex flex-row flex-wrap mx-auto ml-4 md:ml-48 gap-20" >
          <form  onSubmit={handleSubmit} className='p-4 md:p-5 flex flex-col w-72 mx-auto'>
              <div className='py-2'>
                <div className='flex flex-col p-2'>
                  <label
                    className='block mb-2 text-sm font-medium  '
                  >
                    Guide:
                  </label>
                  <select
                    name="guide"
                    value={channelData.guide}
                    onChange={handleChange}
                    className=' border border-gray-300  text-sm rounded-lg w-full p-2.5'
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
                <button
                  type="submit"
                  className='block focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center primaryBtn'
                >
                  Add A Channel
                </button>
              </div>
            </form>
          </div>
        </div>
          
        </>
    )
}
export default ChannelCreate;