import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

const baseURL = 'http://jkthomaasql03';

let authTokens = localStorage.getItem('ITDAacctoken')
  ? JSON.parse(localStorage.getItem('ITDAacctoken'))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens}` },
});

axios.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem('ITDAacctoken')
      ? JSON.parse(localStorage.getItem('ITDAacctoken'))
      : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  const user = jwt_decode(authTokens);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/auth/login/refresh/`, {
    refresh: refresh,
  });
  localStorage.setItem('ITDAacctoken', JSON.stringify(response.data.access));
  localStorage.setItem('ITDAreftoken', JSON.stringify(response.data.refresh));

  req.headers.Authorization = `Bearer ${response.data.access}`;

  return req;
});

export default axiosInstance;
