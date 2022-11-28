import axios from 'axios';

const DEFAULT_CONFIG = {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
const axiosInstance = axios.create(DEFAULT_CONFIG);

axiosInstance.interceptors.request.use(
  (config) => config,
  () => ({ message: '요청에 실패했습니다.' })
);

axiosInstance.interceptors.response.use(
  (config) => config,
  (error) => error.response
);

export default axiosInstance;
// const carAPI = {
//   async getCarList(queryParams = {}) {
//     axiosInstance.defaults.params = queryParams;
//     const res = await axiosInstance.get(``);
//     return res;
//   },

//   async getCarDetail(issueNumber: number, queryParams = {}) {
//     axiosInstance.defaults.params = queryParams;
//     const res = await axiosInstance.get(`/issues/${issueNumber}`);
//     return res;
//   },
// };
// export default carAPI;
