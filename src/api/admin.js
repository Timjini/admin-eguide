import axios from 'axios';
import {API_ROOT} from '../constant'


const getAdminDashboardData = payload => axios.get(`${API_ROOT}/admin/dashboard`, payload);
const getAdminChannelsData = payload => axios.get(`${API_ROOT}/admin/channels`, payload);
const getAdminToursData = payload => axios.get(`${API_ROOT}/admin/tours`, payload);
const getAdminGuidesData = payload => axios.get(`${API_ROOT}/admin/guides`, payload);
const createAgencyOwner = payload => axios.post(`${API_ROOT}/admin/create_agency_owner`, payload);


const adminApi = {
    getAdminDashboardData,
    getAdminChannelsData,
    getAdminToursData,
    getAdminGuidesData,
    createAgencyOwner
  };
  
export default adminApi;