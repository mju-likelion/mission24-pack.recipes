import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ItemAdding } from '../api/List';

const usePlus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      ItemAdding();
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries();
      },
    },
  );
};

export default usePlus;
