import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://stockside.tr.ht/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;
