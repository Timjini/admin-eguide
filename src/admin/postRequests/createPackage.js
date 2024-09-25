import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_VERSION_2 } from '../../constant';
import Alert from '../../components/Alerts/Alert';

const CreatePackage = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);

  const [packageData, setPackageData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert price and duration to numbers
    const newValue = name === 'price' || name === 'duration' ? Number(value) : value;

    setPackageData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_VERSION_2}/packages`, packageData, {
        headers: {
          'Authorization': `Bearer ${user.user.authToken}`,
          'Content-Type': 'application/json',
        },
      });

      setAlertData({ message: response.data.message, status: 'success' });
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error adding subscription package:', error);
      setAlertData({ message: 'An error occurred while adding the package', status: 'error' });
      setLoading(false);
    }
  };

  return (
    <>
      <Alert
        message={alertData?.message}
        status={alertData?.status}
        onClose={() => setAlertData(null)}
      />
      <form onSubmit={handleSubmit} className='p-4 md:p-5 flex flex-col'>
        <div className='flex flex-col gap-1 w-full'>
          <div className='flex flex-col'>
            <label className='block mb-2 text-sm font-medium '>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={packageData.name} 
              onChange={handleChange} 
              className='border border-gray-300 text-sm rounded-lg block w-full p-2.5' 
              placeholder='Package Name' 
              required 
            />
          </div>
          <div className='flex flex-col'>
            <label className='block mb-2 text-sm font-medium '>Description:</label>
            <textarea 
              name="description" 
              value={packageData.description} 
              onChange={handleChange} 
              className='border border-gray-300 text-sm rounded-lg block w-full p-2.5' 
              placeholder='Package Description' 
              required 
            />
          </div>
          <div className='flex flex-col'>
            <label className='block mb-2 text-sm font-medium '>Price:</label>
            <input 
              type="number" 
              name="price" 
              value={packageData.price} 
              onChange={handleChange} 
              className='border border-gray-300 text-sm rounded-lg block w-full p-2.5' 
              placeholder='Package Price' 
              required 
            />
          </div>
          <div className='flex flex-col'>
            <label className='block mb-2 text-sm font-medium '>Duration (Months):</label>
            <input 
              type="number" 
              name="duration" 
              value={packageData.duration} 
              onChange={handleChange} 
              min="1" 
              max="12" 
              className='border border-gray-300 text-sm rounded-lg block w-full p-2.5' 
              placeholder='1-12 Months' 
              required 
            />
          </div>
        </div>
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
          <div className='flex flex-row justify-end'>
            <button type="submit" className="primaryBtn focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Create Package
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default CreatePackage;
