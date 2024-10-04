const token = localStorage.getItem('token');

export const HEADERS = {
  Authorization: `Bearer ${token}`
};
const baseUrl = 'http://localhost:4000/'
// const baseUrl = 'https://stream-ten-eta.vercel.app/';
// const baseUrl = 'https://api.e-guidesolutions.com/'

const baseUrlNoSlash = 'http://localhost:4000'
// const baseUrlNoSlash = 'https://stream-ten-eta.vercel.app';
// const baseUrlNoSlash = 'https://api.e-guidesolutions.com'

export const API_ROOT_PUBLIC = `${baseUrl}`
export const API_ROOT = `${baseUrl}api`;
export const API_PUBLIC_FOLDER = `${baseUrl}`;
export const API_PUBLIC_FOLDER_NO_SLASH = `${baseUrlNoSlash}`;
export const API_USER_DATA = `${baseUrl}api/users/user_data`;
export const API_USER_IMAGE = `${baseUrl}uploads`;
export const API_VERSION_2 = `${baseUrl}api/v2`;