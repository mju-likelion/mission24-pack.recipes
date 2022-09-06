import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLike } from '../api/List';

const useLike = (sort, id) => {
  const queryClient = useQueryClient();
  return useMutation(
    (itemId) => {
      postLike(itemId);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([
          `/items?categoryId=${id}&skip=0&limit=100&orderBy=${sort}:dsc`,
        ]);
      },
    },
  );
};

export default useLike;
