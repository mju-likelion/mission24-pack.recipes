import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
  const { data, isLoading, error } = useQuery(['/category']);

  return {
    data,
    isLoading,
    error,
  };
};

export default useCategory;
