import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';
import LoadingButton from '../components/LoadingButton';
import Alert from '../components/Alert';

const AddMember = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);
  

  const [memberData, setMemberData] = useState({
    name: '',
    // username: '',
    email: '',
    phone: '',
    password: '',
    image: null, 
    agencyId: user.user.agency._id,
  });
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setMemberData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  console.log(user.user.authToken)


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', memberData.name);
      // formData.append('username', memberData.username);
      formData.append('email', memberData.email);
      formData.append('phone', memberData.phone);
      formData.append('password', memberData.password);
      formData.append('image', memberData.image);
      formData.append('type', selectedUserType);
      formData.append('agencyId', user.user.agency._id);

      console.log(formData);


      const response = await agencyApi.addMember(formData, {
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response.data);
      console.log('Member added successfully:', response.data);
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
        className="block cursor-pointer"
        type="button"
      >
        <div className='flex flex-row gap-2 hover:bg-purple-100 p-3 rounded-lg'>
        <span class="material-symbols-outlined text-xl">
        add_circle
        </span>
        <span>Add A Member</span>
        </div>
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40" />
      )}
      <div
        id="crud-modal"
        className={`${
          showModal ? 'fixed' : 'hidden'
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 bg-white rounded-lg shadow dark:bg-gray-700 w-full md:max-w-lg md:w-full`}
      >
        <div className="relative p-4 w-full ">
          <div className="relative ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create A New Member
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
                <div className='flex flex-row gap-1 '>
                    <div className='flex flex-col w-full'>
                      <div>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'> Name:</label>
                      <input type="name" name="name" value={memberData.name} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' placeholder='Users Full Name' required />
                      </div>
                      <div className='flex flex-col'>
                        <label  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>password:</label>
                        <input type='password' name="password" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='*******' value={memberData.password} onChange={handleChange} required />
                      </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <div className='flex flex-col'>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'> Email:</label>
                      <input type="text" name="email" value={memberData.email} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' placeholder='email@company.com' required />
                    </div>
                    <div className='flex flex-col'>
                      <label  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phone:</label>
                      <input type="phone" name="phone" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(212) 548-1478"value={memberData.phone} onChange={handleChange} required />
                    </div>
                </div>
                <div className='flex flex-col mt-2'>
                <select
                  // value={selectedUserType} // Set this value based on your component's state
                  onChange={(e) => setSelectedUserType(e.target.value)} // Update this based on your component's state management
                  className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500"
                >
                  <option value="">Select an Option</option>
                  <option value="guide">Guide</option>
                  <option value="agent">Agent</option>
                </select>
                </div>
                <div className='my-5'>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload An Image</label>    
                    <input type="file" name="image" onChange={handleChange} accept="image/*" className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' />
                </div>
                {loading && (
                    <div className='flex flex-row justify-end'>
                    <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
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
                        <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                          Add A Member
                        </button>
                      </div>
                    )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMember;

