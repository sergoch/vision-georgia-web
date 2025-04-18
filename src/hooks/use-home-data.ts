
import { useQuery } from '@tanstack/react-query';
import type { HomePageData, Service } from '@/types/home-page';
import { fetchHomeData } from '@/services/api-service';

export const useHomeData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['home-page'],
    queryFn: async () => {
      const result = await fetchHomeData();
      return result;
    },
  });

  return {
    homePageData: data?.homePageData,
    services: data?.services || [],
    isLoading,
    error
  };
};
