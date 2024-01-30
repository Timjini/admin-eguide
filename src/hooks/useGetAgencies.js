// useGetTours.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';

const useGetAgencies = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agencies, setAgencies] = useState([]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const agenciesData = await agencyApi.agencies({
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        }
      });

      // Ensure that toursData is an array before setting state
      setAgencies(agenciesData);
    } catch (error) {
      console.error('Error getting tours:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [user.authToken, dispatch]);


  return { agencies, loading, error, refetch: fetchTours };
};

export default useGetAgencies;
