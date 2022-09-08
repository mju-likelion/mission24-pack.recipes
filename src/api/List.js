import Axios from '../lib/axios';

export const postLike = async (itemId) => {
  if (!localStorage.getItem('access-token')) {
    console.log('로그인 후 이용해주세요!'); // 토스트메시지 완료시 변경예정
  } else {
    try {
      await Axios.post(`/items/${itemId}/like`);
    } catch (e) {
      if (e.response.status === 400) {
        await dislike(itemId);
      }
    }
  }
};

export const dislike = async (itemId) => {
  if (!localStorage.getItem('access-token')) {
    console.log('로그인 후 이용해주세요!'); // 토스트메시지 완료시 변경예정
  } else {
    try {
      await Axios.delete(`/items/${itemId}/like`);
    } catch (e) {
      if (e.response.status === 400) {
        await postLike(itemId);
      }
    }
  }
};
