import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';
import { useNavigate } from 'react-router-dom';


const useGetGuidesCount = () => {
  const navigate = useNavigate(); // Get the navigate functiont
  const user = useSelector(state => state.user.user);
  const agencyId = useSelector(state => {
    if (state.user && state.user.user && state.user.user.agency && state.user.user.agency._id) {
      return state.user.user.agency._id;
    }
    return null; // or set a default value or perform other error handling
  });  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agencyData, setAgencyData] = useState([]);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      if (agencyId === null || agencyId === undefined) {
        console.error('agencyId is null or undefined');
        return;
      }
  
      const getAgencyData = await agencyApi.agencyDataUrl({
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
        body: {
          agencyId: agencyId
        }
      });
  
      setAgencyData(getAgencyData);
    } catch (error) {
      navigate('/error');  
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
