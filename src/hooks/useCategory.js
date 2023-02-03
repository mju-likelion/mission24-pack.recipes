import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
    isError: isCategoryError,
  } = useQuery(['/categories']);

  return {
    category,
    categoryLoading,
    categoryError,
    isCategoryError,
  };
};

export default useCategory;
