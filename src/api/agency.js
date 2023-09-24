import axios from 'axios';
import {API_ROOT} from '../constant'

const members = payload => axios.get(`${API_ROOT}/agencies/members`, payload);


const agencyApi = {
    members,
  };
  
export default agencyApi;