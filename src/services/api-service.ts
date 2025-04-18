
import type { HomePageData, Service } from '@/types/home-page';
import { supabase } from '@/integrations/supabase/client';

export const fetchHomeData = async (): Promise<{ homePageData: HomePageData, services: Service[] }> => {
  try {
    // Fetch home page data
    const { data: homeData, error: homeError } = await supabase
      .from('home_page')
      .select('*')
      .single();
    
    if (homeError) throw homeError;

    // Fetch services data
    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (servicesError) throw servicesError;

    return {
      homePageData: homeData,
      services: servicesData || []
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};
