// useGetTours.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';

const useGetChannels = (agencyId) => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channels, setChannels] = useState([]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const channelsData = await agencyApi.channels({
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
        params: {
          agencyId: agencyId
        }
      });

      // Ensure that toursData is an array before setting state
      setChannels(channelsData);
      console.log("SetChannels here",channelsData);
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


  return { channels, loading, error, refetch: fetchTours };
};

export default useGetChannels;
