import axios from 'axios';
import {API_ROOT} from '../constant'

const members = payload => axios.get(`${API_ROOT}/agencies/members`, payload);
const tours = payload => axios.get(`${API_ROOT}/tours/agency_tours`, payload);
const channels = payload => axios.get(`${API_ROOT}/channels/agency_channels`, payload);
const addTour = payload => axios.post(`${API_ROOT}/tours/new_tour`, payload);



const agencyApi = {
    members,
    tours,
    channels,
    addTour
  };
  
export default agencyApi;