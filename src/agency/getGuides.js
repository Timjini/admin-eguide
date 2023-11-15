import { useSelector } from 'react-redux';
import agencyApi from '../api/agency';

const useUser = () => {
  return useSelector(state => state.user);
};

const useGetGuides = () => {
  const user = useUser();

  const getGuides = async () => {
    try {
      const response = await agencyApi.guides({
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting guides:', error);
    }
  };

  return getGuides;
};

export default useGetGuides;