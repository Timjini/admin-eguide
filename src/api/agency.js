import axios from 'axios';
import {API_ROOT} from '../constant'
import {API_VERSION_2} from '../constant'

// Agency Routes
const members = payload => axios.get(`${API_ROOT}/agencies/members`, payload);
const tours = payload => axios.get(`${API_ROOT}/tours/agency_tours`, payload);
const addTour = payload => axios.post(`${API_ROOT}/tours/new_route`, payload);
const addChannel = payload => axios.post(`${API_ROOT}/channels/create`, payload);
const guides = payload => axios.get(`${API_ROOT}/users/guides`, payload);
const addMember = payload => axios.post(`${API_ROOT}/agencies/create_agent`, payload);
const profile = payload => axios.get(`${API_ROOT}/users/profile`, payload);
const agencies = payload => axios.get(`${API_VERSION_2}/agencies`, payload);
const agency = (agencyId, payload) => axios.get(`${API_VERSION_2}/agencies/${agencyId}`, payload);
export const updateAgency = (agencyId, updatedData, config) => {
  return axios.put(`${API_VERSION_2}/agencies/${agencyId}`, updatedData, config);
};
const deleteAgency = (agencyId, payload) => axios.delete(`${API_VERSION_2}/agencies/${agencyId}`, payload);
const tour = (tourId, payload) => axios.get(`${API_VERSION_2}/tours/${tourId}`, payload);
const agencyDataUrl = payload => axios.post(`${API_ROOT}/agencies/agency_data`, payload);
const createAgency = payload => axios.post(`${API_ROOT}/agencies/create_agency`, payload);

const guidesApi = async (user) => {
  try {
    const response = await axios.get(`${API_ROOT}/users/guides`, {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting guides:', error);
    throw error;
  }
};

const channels = payload => axios.get(`${API_ROOT}/agencies/agency_channels`, payload);
// Admin Routes
const users = payload => axios.get(`${API_ROOT}/users/users`, payload);



const agencyApi = {
    members,
    tours,
    channels,
    addTour,
    addChannel,
    users,
    guides,
    addMember,
    guidesApi,
    agencies,
    agencyDataUrl,
    createAgency,
    agency,
    tour,
    updateAgency,
    deleteAgency
  };
  
export default agencyApi;