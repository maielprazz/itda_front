import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '../src/AuthContext';

const baseURL = 'http://jkthomaasql03';

const useAxios = () => {
  const { authToken, setUser, setAuthToken } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authToken?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authToken.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/auth/login/refresh/`, {
      refresh: authToken.refresh,
    });

    localStorage.setItem('ITDAacc', JSON.stringify(response.data));

    setAuthToken(response.data);
    setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
