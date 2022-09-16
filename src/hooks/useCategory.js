import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery(['/categories']);

  return {
    category,
    categoryLoading,
    categoryError,
  };
};

export default useCategory;
