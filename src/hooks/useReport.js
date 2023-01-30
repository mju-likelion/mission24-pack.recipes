import { useMutation } from '@tanstack/react-query';
import { report } from '../api/Report';

const useReport = () => {
  return useMutation((itemId) => {
    return report(itemId);
  }, {});
};

export default useReport;
