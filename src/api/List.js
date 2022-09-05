import Axios from '../lib/axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SortAtom } from '../atoms/SortAtom';
import { TitleAtom } from '../atoms/TitleAtom';
import { ItemAtom } from '../atoms/ItemAtom';

const { sort } = useRecoilValue(SortAtom);
const { id } = useRecoilValue(TitleAtom);
const setItemId = useSetRecoilState(ItemAtom);

export const postLike = async (itemId) => {
  if (!localStorage.getItem('access-token')) {
    // addToast('로그인 후 이용해주세요!', 2000);
  } else {
    try {
      const token = localStorage.getItem('access-token');
      await Axios.post(
        `/item/${itemId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchList();
    } catch {
      await dislike(itemId);
    }
  }
};

export const dislike = async (itemId) => {
  const token = localStorage.getItem('access-token');

  try {
    await Axios.delete(`/item/${itemId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchList();
  } catch {
    //console.log('여기에선 진짜 서버에 문제가 있는거고');
  }
};

export const fetchList = async () => {
  try {
    const res = await Axios.get(`/item/items/${sort}?categoryId=${id}`);
    setItemId(res.data.items);
  } catch (err) {
    //console.log(err);
  }
};
