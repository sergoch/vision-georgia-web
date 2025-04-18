
import { useQuery } from '@tanstack/react-query';
import { pool } from '@/lib/mysql';
import type { HomePageData, Service } from '@/types/home-page';

export const useHomeData = () => {
  const { data: homePageData, isLoading: isHomeLoading } = useQuery({
    queryKey: ['home-page'],
    queryFn: async () => {
      const [rows] = await pool.query('SELECT * FROM home_page LIMIT 1');
      const data = rows[0];
      if (!data) throw new Error('Home page data not found');
      return data as HomePageData;
    },
  });

  const { data: services, isLoading: isServicesLoading } = useQuery({
    queryKey: ['random-services'],
    queryFn: async () => {
      const [rows] = await pool.query(
        'SELECT * FROM services ORDER BY created_at DESC LIMIT 3'
      );
      return rows as Service[];
    },
  });

  return {
    homePageData,
    services,
    isLoading: isHomeLoading || isServicesLoading
  };
};
