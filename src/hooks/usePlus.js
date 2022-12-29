import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addItem } from '../api/List';

const usePlus = (sort, id, itemName) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      addItem(id, itemName); //api 함수 ?
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([
          `/items?categoryId=${id}&skip=0&limit=100&orderBy=${sort}:dsc`,
        ]);
      },
      onError: (err) => {
        alert('글을 저장하지 못했습니다.', err);
      },
      onSettled: () => {},
    },
  );
};

export default usePlus;
