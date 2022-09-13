import Axios from '../lib/axios';
import { toast } from 'react-toastify';

export const postLike = async (itemId) => {
  if (!localStorage.getItem('accessToken')) {
    toast('로그인 후 이용해주세요!');
  } else {
    try {
      await Axios.post(`/items/${itemId}/like`);
    } catch (e) {
      if (e.response.status === 400) {
        await dislike(itemId);
      } else {
        toast(e.response.data.errMsg);
      }
    }
  }
};

export const dislike = async (itemId) => {
  if (!localStorage.getItem('accessToken')) {
    toast('로그인 후 이용해주세요!');
  } else {
    try {
      await Axios.delete(`/items/${itemId}/like`);
    } catch (e) {
      if (e.response.status === 400) {
        await postLike(itemId);
      } else {
        toast(e.response.data.errMsg);
      }
    }
  }
};
