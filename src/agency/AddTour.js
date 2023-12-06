import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';
import useGetGuides from './getGuides';
import Alert from '../components/Alert';



const AddTour = () => {


  const getGuides = useGetGuides();
  const [guides, setGuides] = useState([]);
  const [alertData, setAlertData] = useState(null);


  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);

  const [tourData, setTourData] = useState({
    title: '',
    description: '',
    guide: '',
    agency: '',
    startingDate: '',
    endingDate: '',
    image: null, // for file upload
  });
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setTourData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', tourData.title);
      formData.append('description', tourData.description);
      formData.append('guide', tourData.guide);
      formData.append('agency', user.user.agency._id);
      formData.append('startingDate', tourData.startingDate);
      formData.append('endingDate', tourData.endingDate);
      formData.append('image', tourData.image);

      const response = await agencyApi.addTour(formData, {
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response.data);
      setAlertData({ message: response.data, status: 'success' });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error adding tour:', error);
      setAlertData({ message: 'An error occurred while adding the tour', status: 'error' });
    }
  };

  useEffect(() => {
    const fetchGuides = async () => {
      const guidesData = await getGuides();
      setGuides(guidesData);
    };

    fetchGuides();
  }, []);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };


  return (
    <>
     <Alert
        message={alertData?.message}
        status={alertData?.status}
        onClose={() => setAlertData(null)} // Clear alertData when the alert is closed
      />
      <button
        onClick={openModal}
        className="w-56"
        type="button"
      >
        <div className='flex flex-row gap-2 hover:bg-purple-100 p-3 rounded-lg'>
          <span class="material-symbols-outlined text-xl">
          add_circle
          </span>
          <span>Add A Tour</span>
        </div>
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
                Create A New Tour
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
                    <div className='flex flex-col'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'> Title:</label>
                        <input type="text" name="title" value={tourData.title} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' required />
                    </div>
                    <div className='flex flex-col'>
                        <label  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Description:</label>
                        <textarea name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={tourData.description} onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col p-2'>
                  <label
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Guide:
                  </label>
                  <select
                    name="guide"
                    value={tourData.guide}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
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
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Starting Date:</label>
                        <input type="date" name="startingDate" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={tourData.startingDate} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Ending Date:</label>
                        <input type="date" name="endingDate" value={tourData.endingDate} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                    </div >
                    <div className='mb-5'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>    
                        <input type="file" name="image" onChange={handleChange} accept="image/*" className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' />
                    </div>
                        <button type="submit " className='block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add Tour</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTour;

