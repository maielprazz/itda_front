import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.js';

const baseURL = 'http://jkthomaasql03';

const useAxios = () => {
  const { accToken, setAccToken, refToken, setRefToken } =
    useContext(AppContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${accToken}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(accToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/auth/login/refresh/`, {
      refresh: refToken,
    });

    localStorage.setItem('ITDAacctoken', JSON.stringify(response.data.access));
    localStorage.setItem('ITDAreftoken', JSON.stringify(response.data.refresh));

    setAccToken(response.data.access);
    setRefToken(response.data.refresh);

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
