import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dislike } from '../api/List';

const useDisLike = (sort, id, itemId) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      dislike(itemId);
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

export default useDisLike;
