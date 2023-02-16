import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addItem } from '../api/List';

const usePlus = (sort, id, itemName) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return addItem(id, itemName);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([
          `/items?categoryId=${id}&skip=0&limit=100&orderBy=${sort}:dsc`,
        ]);
      },
      onError: (err) => {
        toast('아이템을 저장하지 못했습니다.', err);
      },
    },
  );
};

export default usePlus;
