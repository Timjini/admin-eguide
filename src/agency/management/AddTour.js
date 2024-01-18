import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import agencyApi from '../../api/agency';
import useGetGuides from '../components/getGuides';
import Alert from '../../components/Alerts/Alert';
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
Button,
} from "@material-tailwind/react";



const AddTour = () => {


  const getGuides = useGetGuides();
  const [guides, setGuides] = useState([]);
  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(false);


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
    setLoading(true);
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
      setLoading(false);
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
      <Button className="flex items-center gap-3 mb-2 primaryBtn" size="sm" onClick={openModal}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Tour
      </Button>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0opacity-50 z-40" />
      )}
      <div
        id="crud-modal"
        className={`${
          showModal ? 'fixed' : 'hidden'
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50  rounded-lg shadow w-full md:max-w-md md:w-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold ">
                Create A New Tour
              </h3>
              <button
                type="button"
                className=" bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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
                    <div className='flex flex-col mb-2'>
                        <label className='block mb-2 text-sm font-medium  '> Title:</label>
                        <input type="text" name="title" value={tourData.title} onChange={handleChange} className=' border border-gray-300  text-sm rounded-lg block w-full p-2.5 "' required />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label  className='block mb-2 text-sm font-medium  '>Description:</label>
                        <textarea name="description" rows="4" className="block p-2.5 w-full text-sm   rounded-lg border border-gray-300 " value={tourData.description} onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col mb-2'>
                      <label
                        className='block mb-2 text-sm font-medium  '
                      >
                        Guide:
                      </label>
                      <select
                        name="guide"
                        value={tourData.guide}
                        onChange={handleChange}
                        className=' block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md '
                        required
                      >
                        <option value="" className="">Select a guide</option>
                        {/* Mapping through guidesData to create options */}
                        {guides.map((guide) => (
                          <option key={guide._id} value={guide._id} className="w-full p-2.5">
                            {guide.user?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='block mb-2 text-sm font-medium  '>Starting Date:</label>
                        <input type="date" name="startingDate" className=' border border-gray-300  text-sm rounded-lg block w-full p-2.5 "' value={tourData.startingDate} onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='block mb-2 text-sm font-medium  '>Ending Date:</label>
                        <input type="date" name="endingDate" value={tourData.endingDate} onChange={handleChange} className=' border border-gray-300  text-sm rounded-lg block w-full p-2.5 "' required />
                    </div >
                    <div className='mb-5'>
                        <label class="block mb-2 text-sm font-medium  " for="file_input">Upload file</label>    
                        <input type="file" name="image" onChange={handleChange} accept="image/*" className=' border border-gray-300  text-sm rounded-lg block w-full p-2.5 "' />
                    </div>
                    {/* add loading */}
                    <div>
                    {loading && (
                    <div className='flex flex-row justify-end'>
                    <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark: dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                      </svg>
                      Loading...
                    </button>
                    </div>
                    )}
                    {!loading && (
                      <div className='flex flex-row justify'>
                        <button type="submit" className="primaryBtn font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                          Add A Tour
                        </button>
                      </div>
                    )}

                    </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTour;

