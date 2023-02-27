import axios from 'axios';

axios.defaults.baseURL = 'https://whirl-backend-api.herokuapp.com';
// axios.defaults.baseURL = 'https://8000-alyshajohns-pp5userstor-tgrl0knnb0z.ws-eu88.gitpod.io';
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();