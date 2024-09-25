import axios from 'axios';
import {API_ROOT, API_VERSION_2} from '../constant'


const getAdminDashboardData = payload => axios.get(`${API_ROOT}/admin/dashboard`, payload);
const getAdminChannelsData = payload => axios.get(`${API_ROOT}/admin/channels`, payload);
const getAdminToursData = payload => axios.get(`${API_ROOT}/admin/tours`, payload);
const getAdminGuidesData = payload => axios.get(`${API_ROOT}/admin/guides`, payload);
const createAgencyOwner = payload => axios.post(`${API_ROOT}/admin/create_agency_owner`, payload);
const getPayments = payload => axios.get(`${API_VERSION_2}/payments`, payload);
const getSubscriptions = payload => axios.get(`${API_VERSION_2}/subscriptions`, payload);
const updateSubscriptions = (id, payload) => {
  return axios.put(`${API_VERSION_2}/subscriptions/${id}`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const updatePayment = (id, payload) => {
  return axios.put(`${API_VERSION_2}/payments/${id}`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const getPackages = payload => axios.get(`${API_VERSION_2}/packages`, payload);
const deletePackage = payload => axios.delete(`${API_VERSION_2}/packages/${payload}`, payload);



const adminApi = {
    getAdminDashboardData,
    getAdminChannelsData,
    getAdminToursData,
    getAdminGuidesData,
    createAgencyOwner,
    getPayments,
    getSubscriptions,
    getPackages,
    deletePackage,
    updateSubscriptions,
    updatePayment
  };
  
export default adminApi;