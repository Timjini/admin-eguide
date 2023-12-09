import axios from 'axios';
import {API_ROOT} from '../constant'

// Agency Routes
const members = payload => axios.get(`${API_ROOT}/agencies/members`, payload);
const tours = payload => axios.get(`${API_ROOT}/tours/agency_tours`, payload);
const channels = payload => axios.get(`${API_ROOT}/channels/agency_channels`, payload);
const addTour = payload => axios.post(`${API_ROOT}/tours/new_tour`, payload);
const addChannel = payload => axios.post(`${API_ROOT}/channels/create`, payload);
const guides = payload => axios.get(`${API_ROOT}/users/guides`, payload);
const addMember = payload => axios.post(`${API_ROOT}/agencies/create_agent`, payload);

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
    addMember
  };
  
export default agencyApi;