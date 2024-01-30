import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';

const useGetGuidesCount = () => {
  const user = useSelector(state => state.user.user);
  const agencyId = useSelector(state => state.user.user.agency._id);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agencyData, setAgencyData] = useState([]);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const getAgencyData = await agencyApi.agencyDataUrl({
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
        body: {
          agencyId: agencyId
        }
      });
  
      setAgencyData(getAgencyData);
    console.log("setGuides here", agencyData);
    } catch (error) {
      console.error('Error getting guides:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, [user.authToken, agencyId, dispatch]);


  return { agencyData, loading, error, refetch: fetchGuides };
};

export default useGetGuidesCount;
