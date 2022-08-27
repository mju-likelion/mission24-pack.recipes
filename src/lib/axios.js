import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MzBhNzE0ZTc3M2JmOWE5Y2JhNGNmOTMiLCJpYXQiOjE2NjE2Mjg3NTJ9.4e6-bl2b-CuBu__UR-zwCF8dkekD4X5DvPyJrX7dJso',
  },
});

export default Axios;
