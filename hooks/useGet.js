import useSWR from 'swr';
import api from '../utils/api';

export function useGet(url, options) {
  const { data, error } = useSWR(
    url,
    async () => {
      const response = await api(url);

      return response.data;
    },
    options
  );

  return { data, error };
}
