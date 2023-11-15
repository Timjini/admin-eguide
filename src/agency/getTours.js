import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';

const useUser = () => {
  return useSelector(state => state.user);
};

const useGetTours = () => {
  const user = useUser();

  const getTours = async () => {
    try {
      const response = await agencyApi.tours({
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting guides:', error);
    }
  };

  return getTours;
};

export default useGetTours;