import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import adminApi from '../../api/admin';
import axios from 'axios';
import {API_VERSION_2} from '../../constant'
import Alert from '../../components/Alerts/Alert';
import useGetAgencies from '../../hooks/useGetAgencies';
// import Loader from '../../components/Loaders/Loader';
import SearchInputComponent from '../../components/Inputs/SearchInputComponent';
import useGetPackages from '../../hooks/useGetPackages';


const CreateSubscription = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const { agencies, agencyLoading, error } = useGetAgencies();
  const { packages, packagesLoading, packagesError } = useGetPackages();
  const [selectedAgency, setSelectedAgency] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  const agencyList = agencies?.data?.agencies || [];
  const packageList = packages?.data || [];

  const [subscriptionData, setSubscriptionData] = useState({
    agencyId: selectedAgency, // Include agencyId here
    packageId: selectedPackage, // Include packageId here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubscriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
    formData.append('agencyId', subscriptionData.agencyId);
    formData.append('packageId', subscriptionData.packageId);
    formData.append('startDate', subscriptionData.startDate);

      const response = await axios.post(`${API_VERSION_2}/subscriptions`, formData, {
        headers: {
          'Authorization': `Bearer ${user.user.authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setAlertData({ message: response.data.message || 'Success!', status: 'success' });
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error adding agency Admin:', error);
      setAlertData({ message: 'An error occurred while adding an account', status: 'error' });
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
      <form onSubmit={handleSubmit} className='p-4 md:p-5 flex flex-col gap-5'>
        <SearchInputComponent
          options={agencyList}
          placeholder="Search Agency..."
          onChange={(agencyId) => {
            setSelectedAgency(agencyId);
            setSubscriptionData((prevData) => ({ ...prevData, agencyId })); // Update memberData with agencyId
          }}
        />
        <SearchInputComponent
          options={packageList}
          placeholder="Search Package..."
          onChange={(packageId) => {
            setSelectedPackage(packageId);
            setSubscriptionData((prevData) => ({ ...prevData, packageId })); // Update memberData with packageId
          }}
        />
        <input type="date" name="startDate" className='shadow-sm border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5' onChange={handleChange} />
        {/* Other input fields here */}
        {loading ? (
          <button disabled type="button" className="loading-button">Loading...</button>
        ) : (
          <button type="submit" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 mb-2 primaryBtn">Add A Subscription</button>
        )}
      </form>
    </>
  );
};

export default CreateSubscription;


