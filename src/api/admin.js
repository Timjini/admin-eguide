import axios from 'axios';
import {API_ROOT, API_VERSION_2} from '../constant'
import { store } from '../redux/store';


const apiClient = axios.create({
  baseURL: API_VERSION_2,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const authToken = state.user?.authToken;

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const getAdminDashboardData = payload => axios.get(`${API_ROOT}/admin/dashboard`, payload);
const getAdminChannelsData = payload => axios.get(`${API_ROOT}/admin/channels`, payload);
const getAdminToursData = payload => axios.get(`${API_ROOT}/admin/tours`, payload);
const getAdminGuidesData = payload => axios.get(`${API_ROOT}/admin/guides`, payload);
const createAgencyOwner = payload => axios.post(`${API_ROOT}/admin/create_agency_owner`, payload);
const getPayments = payload => apiClient.get(`${API_VERSION_2}/payments`, payload);
const getSubscriptions = payload => apiClient.get(`${API_VERSION_2}/subscriptions`, payload);
const updateSubscriptions = (id, payload) => {
  return apiClient.put(`${API_VERSION_2}/subscriptions/${id}`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const updatePayment = (id, payload) => {
  return apiClient.put(`${API_VERSION_2}/payments/${id}`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const getPackages = payload => apiClient.get(`${API_VERSION_2}/packages`, payload);
const deletePackage = payload => apiClient.delete(`${API_VERSION_2}/packages/${payload}`, payload);



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