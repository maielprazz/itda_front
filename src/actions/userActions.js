import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: { 'Content-type': 'application/json' },
    };
    const { data } = await axios.post(
      // '/auth/login/',
      'http://jkthomaasql03/auth/login/',
      { username: username, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    // console.log(data);
    localStorage.setItem('ITDAreftoken', JSON.stringify(data.refresh));
    localStorage.setItem('ITDAacctoken', JSON.stringify(data.access));
    localStorage.setItem('ITDAmenu', JSON.stringify(data.drawmenu));
    localStorage.setItem('ITDAusr', JSON.stringify(data.username));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('ITDAreftoken');
  localStorage.removeItem('ITDAacctoken');
  localStorage.removeItem('ITDAmenu');
  localStorage.removeItem('ITDAusr');
  dispatch({
    type: USER_LOGOUT,
  });
};
