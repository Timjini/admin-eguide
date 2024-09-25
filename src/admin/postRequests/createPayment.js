import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import adminApi from '../../api/admin';
import axios from 'axios';
import {API_ROOT, API_VERSION_2} from '../../constant'
import Alert from '../../components/Alerts/Alert';
import useGetAgencies from '../../hooks/useGetAgencies';
import Loader from '../../components/Loaders/Loader';
import SearchInputComponent from '../../components/Inputs/SearchInputComponent';
import useGetPackages from '../../hooks/useGetPackages';


const CreatePayment = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const { agencies, agencyLoading, error } = useGetAgencies();
  const { packages, packagesLoading, packagesError } = useGetPackages();
  const [selectedAgency, setSelectedAgency] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  const agencyList = agencies?.data?.agencies || [];
  const packageList = packages?.data || [];

  const [memberData, setMemberData] = useState({
    agencyId: selectedAgency, // Include agencyId here
    packageId: selectedPackage, // Include packageId here
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setMemberData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('agencyId', selectedAgency); 
      formData.append('packageId', selectedPackage);

      const response = await axios.post(`${API_VERSION_2}/payments`, formData, {
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
            setMemberData((prevData) => ({ ...prevData, agencyId })); // Update memberData with agencyId
          }}
        />
        <SearchInputComponent
          options={packageList}
          placeholder="Search Package..."
          onChange={(packageId) => {
            setSelectedPackage(packageId);
            setMemberData((prevData) => ({ ...prevData, packageId })); // Update memberData with packageId
          }}
        />
        {/* Other input fields here */}
        {loading ? (
          <button disabled type="button" className="loading-button">Loading...</button>
        ) : (
          <button type="submit" className="primaryBtn">Add A Payment</button>
        )}
      </form>
    </>
  );
};

export default CreatePayment;


