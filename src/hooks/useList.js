import { useQuery } from '@tanstack/react-query';

const useList = (sort, id) => {
  const {
    data: list,
    isLoading: listLoading,
    error: listError,
  } = useQuery([
    `/items?categoryId=${id}&skip=0&limit=100&orderBy=${sort}:dsc`,
  ]);

  return {
    list,
    listLoading,
    listError,
  };
};

export default useList;
