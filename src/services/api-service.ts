
import type { HomePageData, Service } from '@/types/home-page';
import { supabase } from '@/integrations/supabase/client';

export const fetchHomeData = async (): Promise<{ homePageData: HomePageData, services: Service[] }> => {
  try {
    console.log('Attempting to fetch home page data from Supabase...');
    
    // Fetch home page data - get all rows and use the first one
    const { data: homeDataAll, error: homeError } = await supabase
      .from('home_page')
      .select('*');
    
    if (homeError) {
      console.error('Error fetching home page data:', homeError);
      throw homeError;
    }
    
    // Use the first row from the results
    const homeData = homeDataAll && homeDataAll.length > 0 ? homeDataAll[0] : null;
    
    if (!homeData) {
      throw new Error('No home page data found');
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
