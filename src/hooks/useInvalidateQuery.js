import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries();
};
