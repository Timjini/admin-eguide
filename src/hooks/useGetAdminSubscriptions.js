// useGetTours.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import adminApi from '../api/admin';

const useGetAdminSubscriptions = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const subscriptionsData = await adminApi.getSubscriptions({
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        }
      });

      // Ensure that toursData is an array before setting state
      setSubscriptions(subscriptionsData);
    } catch (error) {
      console.error('Error getting tours:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user.authToken, dispatch]);


  return { subscriptions, loading, error, refetch: fetchSubscriptions };
};

export default useGetAdminSubscriptions;
