import { useQuery } from '@tanstack/react-query';

const useList = (sort, id) => {
  const {
    data: list,
    isLoading: listLoading,
    refetch: listFetch,
    error: listError,
    isError: isListError,
  } = useQuery(
    [`/items?categoryId=${id}&skip=0&limit=100&orderBy=${sort}:dsc`],
    { enabled: false },
  );

  return {
    list,
    listLoading,
    listFetch,
    listError,
    isListError,
  };
};

export default useList;
