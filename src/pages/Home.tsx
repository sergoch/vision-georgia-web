
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ContactSection } from '@/components/home/ContactSection';
import { useHomeData } from '@/hooks/use-home-data';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const Home: React.FC = () => {
  const { isGeorgian } = useLanguage();
  const { homePageData, services, isLoading, error } = useHomeData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>{isGeorgian ? 'იტვირთება...' : 'Loading...'}</div>
      </div>
    );
  }

  if (error || !homePageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>{isGeorgian ? 'შეცდომა მონაცემების ჩატვირთვისას' : 'Error loading data'}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <Link to="/auth">
          <Button variant="ghost" size="icon" className="text-white hover:text-rvision-orange hover:bg-rvision-blue/30">
            <LogIn className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <HeroSection heroData={homePageData} />
      <ServicesSection services={services} sectionTitle={homePageData} />
      <ProjectsSection projectData={homePageData} />
      <ContactSection contactData={homePageData} />
      <div className="mt-auto py-6 flex justify-center items-center">
        <Link to="/auth">
          <Button variant="outline" className="text-rvision-blue hover:bg-rvision-blue/10">
            <LogIn className="mr-2 h-4 w-4" />
            {isGeorgian ? 'შესვლა' : 'Login'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
