import axios from 'axios';
import { getCookie, setCookie } from '../util/Cookie';
import { refreshAccessToken } from '../api/LoginRegister';
import { toast } from 'react-toastify';
// import { dislike } from '../api/List';

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
    const refreshToken = getCookie('refreshToken');
    try {
      const res = await refreshAccessToken(refreshToken);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        res.data;
      setCookie('refreshToken', newRefreshToken);
      localStorage.setItem('accessToken', newAccessToken);
      Axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      config.headers.Authorization = newAccessToken;
      return Axios(config);
    } catch (e) {
      toast('다시 로그인해주세요!');
    }
  } else if (status === 401 && errorCode === 'AUTHORIZATION_NOT_SUGGESTED') {
    //액세스 토큰이 없을 때
    toast('로그인 후 이용해주세요!');
  }
  return Promise.reject(err);
});

export default Axios;
