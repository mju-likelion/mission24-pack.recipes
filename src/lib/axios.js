import axios from 'axios';
import { setCookie } from '../util/Cookie';
import { refreshAccessToken } from '../api/LoginRegister';
import { toast } from 'react-toastify';

const token = localStorage.getItem('accessToken');

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

Axios.interceptors.response.use(null, async (err) => {
  const {
    config,
    response: {
      status,
      data: { errorCode },
    },
  } = err;
  if (status === 401 && errorCode === 'AUTHORIZATION_INVALID') {
    //액세스 토큰이 만료되었을 때
    try {
      const res = await refreshAccessToken();
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        res.data;
      setCookie('refreshToken', newRefreshToken);
      localStorage.setItem('accessToken', newAccessToken);
      Axios.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return await Axios(config);
    } catch (e) {
      toast('다시 로그인해주세요!');
      //리프레시 토큰이 만료된 경우
    }
  }

  return Promise.reject(err);
});

export default Axios;
