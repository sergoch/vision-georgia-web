
import { useQuery } from '@tanstack/react-query';
import type { HomePageData, Service } from '@/types/home-page';
import { fetchHomeData } from '@/services/api-service';

export const useHomeData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['home-page'],
    queryFn: async () => {
      try {
        console.log('Executing home page data query...');
        const result = await fetchHomeData();
        console.log('Query executed successfully:', result);
        return result;
      } catch (error) {
        console.error('Error in useHomeData query:', error);
        throw error;
      }
    },
    retry: 1, // Limit retries to avoid excessive error logs
  });

  return {
    homePageData: data?.homePageData || null,
    services: data?.services || [],
    isLoading,
    error
  };
};
