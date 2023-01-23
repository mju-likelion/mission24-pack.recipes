import Axios from '../lib/axios';
import { toast } from 'react-toastify';

export const report = async (itemId) => {
  if (!localStorage.getItem('accessToken')) {
    toast('로그인 후 이용해 주세요!');
  } else {
    try {
      await Axios.post(`/report/${itemId}`);

      toast('신고 완료했습니다.');
    } catch (e) {
      if (e.response.status === 400) {
        toast(e.response.data.errMsg);
      } else {
        console.log(e);
      }
    }
  }
};
