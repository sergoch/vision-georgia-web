
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ContactSection } from '@/components/home/ContactSection';

const Home: React.FC = () => {
  const { isGeorgian } = useLanguage();

  const { data: homePageData, isLoading: isHomeLoading } = useQuery({
    queryKey: ['home-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('home_page')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
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
      return data;
    },
  });

  if (isHomeLoading || isServicesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>{isGeorgian ? 'იტვირთება...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection heroData={homePageData} />
      <ServicesSection services={services} sectionTitle={homePageData} />
      <ProjectsSection projectData={homePageData} />
      <ContactSection contactData={homePageData} />
    </div>
  );
};

export default Home;
