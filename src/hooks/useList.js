import { useQuery } from '@tanstack/react-query';

const useList = (sort, id) => {
  const {
    data: list,
    isLoading: listLoading,
    error: listError,
  } = useQuery([`/item/items/${sort}?categoryId=${id}`]);

  return {
    list,
    listLoading,
    listError,
  };
};

export default useList;
