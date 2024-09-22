import axios from 'axios';
import {API_ROOT, API_VERSION_2} from '../constant'


const getAdminDashboardData = payload => axios.get(`${API_ROOT}/admin/dashboard`, payload);
const getAdminChannelsData = payload => axios.get(`${API_ROOT}/admin/channels`, payload);
const getAdminToursData = payload => axios.get(`${API_ROOT}/admin/tours`, payload);
const getAdminGuidesData = payload => axios.get(`${API_ROOT}/admin/guides`, payload);
const createAgencyOwner = payload => axios.post(`${API_ROOT}/admin/create_agency_owner`, payload);
const getPayments = payload => axios.get(`${API_VERSION_2}/payments`, payload);
const getSubscriptions = payload => axios.get(`${API_VERSION_2}/subscriptions`, payload);



const adminApi = {
    getAdminDashboardData,
    getAdminChannelsData,
    getAdminToursData,
    getAdminGuidesData,
    createAgencyOwner,
    getPayments,
    getSubscriptions
  };
  
export default adminApi;