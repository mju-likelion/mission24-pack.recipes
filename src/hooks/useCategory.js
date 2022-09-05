import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery(['/category']);

  return {
    category,
    categoryLoading,
    categoryError,
  };
};

export default useCategory;
