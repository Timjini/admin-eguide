import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import agencyApi from '../../api/agency';
import useGetGuides from '../components/getGuides';
import useGetTours from '../components/getTours';
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
Button,
} from "@material-tailwind/react";
import BackButton from '../../components/Buttons/BackButton';

const AddChannel = ({closeModal}) => {
  const getGuides = useGetGuides();
  const [guides, setGuides] = useState([]);

  const getTours = useGetTours();
  const [tours, setTours] = useState([]);

  const [showModal, setShowModal] = useState(false);
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

  

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchGuides = async () => {
      const guidesData = await getGuides();
      setGuides(guidesData);
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      const toursData = await getTours();
      setTours(toursData);
    };

    fetchTours();
  }, []);

  if (!tours.tour || tours.tour.length === 0) {
    return null; // Return null or a message when there is no tour data
  }


  return (
    <>
    <div className='flex flex-row justify-between'>
    <BackButton />
      <Button className="flex items-center gap-3 mb-2 primaryBtn" size="sm" onClick={openModal}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
      </Button>
    </div>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40" />
      )}
      <div
        id="crud-modal"
        className={`${
          showModal ? 'fixed' : 'hidden'
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50  rounded-lg shadow  w-full md:max-w-md md:w-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold ">
                Create A New Channel
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                    {tours.tour.map((tour) => (
                      <option key={tour._id} value={tour._id}>
                        {tour.title}
                      </option>
                    ))}
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
      </div>
    </>
  );
};

export default AddChannel;
