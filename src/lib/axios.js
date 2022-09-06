import axios from 'axios';

const token = localStorage.getItem('access-token');

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default Axios;
