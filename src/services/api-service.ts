
import type { HomePageData, Service } from '@/types/home-page';
import { supabase } from '@/integrations/supabase/client';

export const fetchHomeData = async (): Promise<{ homePageData: HomePageData, services: Service[] }> => {
  try {
    console.log('Attempting to fetch home page data from Supabase...');
    
    // Fetch home page data
    const { data: homeData, error: homeError } = await supabase
      .from('home_page')
      .select('*')
      .single();
    
    if (homeError) {
      console.error('Error fetching home page data:', homeError);
      throw homeError;
    }
    
    console.log('Home page data fetched successfully:', homeData);

    // Fetch services data
    console.log('Attempting to fetch services data from Supabase...');
    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (servicesError) {
      console.error('Error fetching services data:', servicesError);
      throw servicesError;
    }
    
    console.log('Services data fetched successfully:', servicesData);

    return {
      homePageData: homeData,
      services: servicesData || []
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};
