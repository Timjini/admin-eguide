import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';
import useGetGuides from './getGuides';
import useGetTours from './getTours';

const AddChannel = () => {
  const getGuides = useGetGuides();
  const [guides, setGuides] = useState([]);

  const getTours = useGetTours();
  const [tours, setTours] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const [channelData, setChannelData] = useState({
    type: 'public',
    guide: '',
    tour: '', // Modified the initial state for tour
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
      console.log(response)
      setData(response.data);
      console.log('Channel added successfully:', response.data);
      window.location.reload();
      alert('Channel added successfully');
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  };

  console.log(channelData.guide)
  

    // console.log(user.user.authToken)
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchGuides = async () => {
      const guidesData = await getGuides();
      setGuides(guidesData);
      console.log(guidesData);
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      const toursData = await getTours();
      setTours(toursData);
      console.log(toursData);
    };

    fetchTours();
  }, []);

  if (!tours.tour || tours.tour.length === 0) {
    // console.log('No tour data available.');
    return null; // Return null or a message when there is no tour data
  }

  return (
    <>
      <button
        onClick={openModal}
        className="block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add A tour
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40" />
      )}
      <div
        id="crud-modal"
        className={`${
          showModal ? 'fixed' : 'hidden'
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 bg-white rounded-lg shadow dark:bg-gray-700 w-full md:max-w-md md:w-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create A New Channel
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={openModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className='p-4 md:p-5 flex flex-col'>
              <div className='py-2'>
                <div className='flex flex-col p-2'>
                  <label
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Guide:
                  </label>
                  <select
                    name="guide"
                    value={channelData.guide}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    required
                  >
                    {/* Mapping through guidesData to create options */}
                    {guides.map((guide) => (
                      <option key={guide._id} value={guide._id}>
                        {guide.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col p-2'>
                  <label
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Tour:
                  </label>
                  <select
                    name="tour"
                    value={channelData.tour}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    required
                  >
                    {/* Mapping through toursData to create options */}
                    {tours.tour.map((tour) => (
                      <option key={tour._id} value={tour._id}>
                        {tour.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col p-2'>
                  <label
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Starting Date:
                  </label>
                  <input
                    type="date"
                    name="startingDate"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    value={channelData.startingDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='flex flex-col p-2 mb-5'>
                  <label
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Ending Date:
                  </label>
                  <input
                    type="date"
                    name="endingDate"
                    value={channelData.endingDate}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                </div>
                <button
                  type="submit"
                  className='block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Add Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChannel;
