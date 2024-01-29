import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import adminApi from '../api/admin';

const useGetAdminDashboardData = () => {
    const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAdminDashboardData({
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        }
      });
      setDashboardData(response);
      console.log("fetch response",response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.authToken, dispatch]);

  return { dashboardData, loading, error };
}

export default useGetAdminDashboardData;