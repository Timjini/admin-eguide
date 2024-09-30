// useGetTours.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import adminApi from '../api/admin';

const useGetPackages = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const packagesData = await adminApi.getPackages({
        headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
      });

      // Ensure that toursData is an array before setting state
      setPackages(packagesData);
    } catch (error) {
      console.error('Error getting tours:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [user.authToken, dispatch]);


  return { packages, loading, error, refetch: fetchPackages };
};

export default useGetPackages;
