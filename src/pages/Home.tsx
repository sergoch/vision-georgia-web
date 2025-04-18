
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ContactSection } from '@/components/home/ContactSection';
import { useHomeData } from '@/hooks/use-home-data';

const Home: React.FC = () => {
  const { isGeorgian } = useLanguage();
  const { homePageData, services, isLoading } = useHomeData();

  if (isLoading) {
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
