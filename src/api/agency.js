import axios from 'axios';
import {API_ROOT} from '../constant'

const members = payload => axios.get(`${API_ROOT}/agencies/members`, payload);
const tours = payload => axios.get(`${API_ROOT}/tours/agency_tours`, payload);
const channels = payload => axios.get(`${API_ROOT}/channels/agency_channels`, payload);



const agencyApi = {
    members,
    tours,
    channels
  };
  
export default agencyApi;