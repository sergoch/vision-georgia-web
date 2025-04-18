
import type { HomePageData, Service } from '@/types/home-page';

const API_URL = import.meta.env.VITE_API_URL || '';

export const fetchHomeData = async (): Promise<{ homePageData: HomePageData, services: Service[] }> => {
  try {
    // For now, we'll use mock data while you set up the API server
    // In production, this would make a fetch call to your API
    
    // Example of how the API call would look:
    // const response = await fetch(`${API_URL}/api/home`);
    // if (!response.ok) throw new Error('Failed to fetch home data');
    // return await response.json();
    
    // Mock data (use the same structure as your database)
    const mockHomeData: HomePageData = {
      hero_title_en: 'Real Vision',
      hero_title_ka: 'რეალ ვიჟენ',
      hero_subtitle_en: 'Engineering and Geodetic Services',
      hero_subtitle_ka: 'საინჟინრო და გეოდეზიური მომსახურება',
      hero_image_url: 'https://example.com/hero.jpg',
      services_title_en: 'Our Services',
      services_title_ka: 'ჩვენი სერვისები',
      projects_title_en: 'Our Projects',
      projects_title_ka: 'ჩვენი პროექტები',
      projects_description_en: 'Explore our recent work',
      projects_description_ka: 'გაეცანით ჩვენს ბოლო ნამუშევრებს',
      projects_image_url: 'https://example.com/projects.jpg',
      contact_title_en: 'Contact Us',
      contact_title_ka: 'დაგვიკავშირდით',
      contact_description_en: 'Get in touch with our team',
      contact_description_ka: 'დაუკავშირდით ჩვენს გუნდს',
    };
    
    const mockServices: Service[] = [
      {
        id: '1',
        title_en: 'Geodetic Works',
        title_ka: 'გეოდეზიური სამუშაოები',
        description_en: 'Professional geodetic services',
        description_ka: 'პროფესიონალური გეოდეზიური მომსახურება',
        image_url: 'https://example.com/geodetic.jpg',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        title_en: 'Engineering',
        title_ka: 'საინჟინრო',
        description_en: 'Engineering solutions',
        description_ka: 'საინჟინრო გადაწყვეტილებები',
        image_url: 'https://example.com/engineering.jpg',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        title_en: 'GIS Services',
        title_ka: 'GIS სერვისები',
        description_en: 'Geographic Information Systems',
        description_ka: 'გეოგრაფიული საინფორმაციო სისტემები',
        image_url: 'https://example.com/gis.jpg',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    return {
      homePageData: mockHomeData,
      services: mockServices
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};
