import axios from 'axios';
import {API_ROOT} from '../constant'

const login = payload => axios.post(`${API_ROOT}/users/login`, payload);
const logout = headers => axios.post(`${API_ROOT}/users/logout`, null, { headers });


const authenticationApi = {
    login,
    logout,
  };
  
  export default authenticationApi;