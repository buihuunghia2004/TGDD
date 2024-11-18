import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7777/api/v1',
  timeout: 5000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = sessionStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosInstance