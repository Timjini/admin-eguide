// useGetGuides.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import agencyApi  from '../api/agency';
import { setGuides } from '../redux/guideSlice';

const useGetGuides = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guides, setGuides] = useState([]);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const guidesData = await agencyApi.guidesApi(user);
  
      // Ensure that guidesData is an array before dispatching
     
        setGuides(guidesData);
        // dispatch(setGuides(guidesData));
    } catch (error) {
      console.error('Error getting guides:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGuides();
  }, [user, dispatch]);

  return { guides ,loading, error, refetch: fetchGuides };
};

export default useGetGuides;
