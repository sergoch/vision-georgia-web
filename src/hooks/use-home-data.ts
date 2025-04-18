
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { HomePageData, Service } from '@/types/home-page';

export const useHomeData = () => {
  const { data: homePageData, isLoading: isHomeLoading } = useQuery({
    queryKey: ['home-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('home_page')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as HomePageData;
    },
  });

  const { data: services, isLoading: isServicesLoading } = useQuery({
    queryKey: ['random-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .limit(3)
        .order('random()');
      
      if (error) throw error;
      return data as Service[];
    },
  });

  return {
    homePageData,
    services,
    isLoading: isHomeLoading || isServicesLoading
  };
};
