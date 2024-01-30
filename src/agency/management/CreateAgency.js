import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import agencyApi from '../../api/agency';
import { useNavigate } from 'react-router-dom';
import { API_ROOT } from '../../constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUserAction } from '../../redux/actions/userActions';

const CreateAgency = () => {
  const navigate = useNavigate(); // Get the navigate functiont
  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(false);
  // get token from localstorage
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  console.log(token)
  const [agencyData, setAgencyData] = useState({
    name: '',
    description: '',
    image: null, // for file upload
  });

  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setAgencyData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', agencyData.name);
      formData.append('description', agencyData.description);
      formData.append('image', agencyData.image);

      const response = await axios.post(`${API_ROOT}/agencies/create_agency`,formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response.data);
      setAlertData({ message: response.data, status: 'success' });
      setLoading(false);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
      console.log(response.data.user)
      // dispatch(updateUserAction(response.data.user));
      // logout user
      localStorage.removeItem('token');
      // localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error adding tour:', error);
      setLoading(false);
      setAlertData({ message: 'An error occurred while creating an organization', status: 'error' });
    }
  };




    return(
      <section className="navigation" >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-5">
          <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 " role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Important!</span><br/>Please create an organization/agency profile to proceed.
            </div>
          </div>
             <form  className='p-4 md:p-5 flex flex-col' onSubmit={handleSubmit} >
                <div className='flex flex-row gap-1 '>
                    <div className='flex flex-col w-full'>
                      <div>
                      <label className='block mb-2 text-sm font-medium '> Organizaton/Agency Name:</label>
                      <input type="name" name="name" value={agencyData.name} onChange={handleChange} className=' border border-gray-300  text-sm rounded-lg  block w-full p-2.5 ' placeholder='Organization Name' required />
                      </div>
                      <div className='flex flex-col'>
                        <label  className='block mb-2 text-sm font-medium '>Description:</label>
                        <textarea name="description" rows="4" className="block p-2.5 w-full text-sm   rounded-lg border border-gray-300 " value={agencyData.description} onChange={handleChange} placeholder='Please share some information about your organizations/agency...'  required />


                      </div>
                    </div>
                </div>
                <div className='flex flex-col mt-2'>
                
                <div class="flex items-center justify-center w-full mb-5">
                {/* <input class="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " id="file_input" type="file"/> */}

                  <input id="file_input" type="file" name="image" onChange={handleChange} accept="image/*" className='block w-full text-sm  border rounded-lg cursor-pointer  ' required />

                </div> 

                </div>
                {loading && (
                    <div className='flex flex-row justify-end mt-4'>
                    <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700  inline-flex items-center">
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
                        <button type="submit" className="primaryBtn focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                          Confirm to proceed
                        </button>
                      </div>
                    )}
            </form>
            </div>
          </div>
        </div>
        </section>
    )
}

export default CreateAgency;