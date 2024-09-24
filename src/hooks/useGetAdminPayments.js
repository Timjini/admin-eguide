// useGetTours.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import adminApi from '../api/admin';

const useGetAdminPayments = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const paymentsData = await adminApi.getPayments({
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        }
      });

      // Ensure that toursData is an array before setting state
      setPayments(paymentsData);
      console.log(paymentsData)
    } catch (error) {
      console.error('Error getting tours:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user.authToken, dispatch]);


  return { payments, loading, error, refetch: fetchPayments };
};

export default useGetAdminPayments;
