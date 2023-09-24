import axios from 'axios';
import {API_ROOT} from '../constant'

const login = payload => axios.post(`${API_ROOT}/users/login`, payload);
const logout = headers => axios.post(`${API_ROOT}/users/logout`, null, { headers });
const members = payload => axios.get(`${API_ROOT}/agencies/members`, payload);


const authenticationApi = {
    login,
    logout,
    members,
  };
  
  export default authenticationApi;