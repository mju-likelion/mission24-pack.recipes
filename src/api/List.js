import Axios from '../lib/axios';
import { toast } from 'react-toastify';

export const postLike = async (itemId) => {
  if (!localStorage.getItem('accessToken')) {
    toast('로그인 후 이용해 주세요!');
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
    toast('로그인 후 이용해 주세요!');
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

export const addItem = async (id, itemName) => {
  if (!localStorage.getItem('accessToken')) {
    toast('로그인 후 이용해 주세요!');
  } else {
    try {
      for (const item of itemName) {
        await Axios.post('/items', {
          categoryId: id,
          name: item,
        });
      }
    } catch (e) {
      if (e.response.status === 500) {
        toast('추가할 아이템을 다시 입력해 주세요.');
      }
    }
  }
};
