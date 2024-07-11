// useAgencyData.js
import { useEffect } from 'react';
import agencyApi from '../../api/agency';
import { useNavigate, useParams } from 'react-router-dom';


const useAgencyData = ({ onMembers, onTours, onChannels }) => {
  const { agencyId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch members
        const membersResponse = await agencyApi.members();
        const membersData = membersResponse.data.members;
        onMembers && onMembers(membersData);

        // Fetch tours
        const toursResponse = await agencyApi.tours();
        const toursData = toursResponse.data.tours;
        onTours && onTours(toursData);

        // Fetch channels
        const channelsResponse = await agencyApi.channels({agencyId});
        const channelsData = channelsResponse.data.channels;
        onChannels && onChannels(channelsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run this effect once when the component mounts
};

export default useAgencyData;
