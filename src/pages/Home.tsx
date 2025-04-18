
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
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Link to="/auth">
          <Button variant="ghost" size="sm" className="text-white hover:text-rvision-orange hover:bg-rvision-blue/30">
            <LogIn className="mr-2 h-4 w-4" />
            {isGeorgian ? 'შესვლა' : 'Login'}
          </Button>
        </Link>
      </div>
      <HeroSection heroData={homePageData} />
      <ServicesSection services={services} sectionTitle={homePageData} />
      <ProjectsSection projectData={homePageData} />
      <ContactSection contactData={homePageData} />
    </div>
  );
};

export default Home;
