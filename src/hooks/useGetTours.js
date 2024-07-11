// useGetTours.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';

const useGetTours = (agencyId) => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const toursData = await agencyApi.tours({
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
        params: {
          agencyId: agencyId
        }
      });

      // Ensure that toursData is an array before setting state
        setTours(toursData);
    } catch (error) {
      console.error('Error getting tours:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [user.authToken, agencyId, dispatch]);


  return { tours, loading, error, refetch: fetchTours };
};

export default useGetTours;
