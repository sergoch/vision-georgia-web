
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ServiceCard } from './services/ServiceCard';
import { ServicesHeader } from './services/ServicesHeader';
import type { Service } from '@/types/home-page';

interface ServicesSectionProps {
  services: Service[] | null;
  sectionTitle: {
    services_title_en: string;
    services_title_ka: string;
  };
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, sectionTitle }) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-b from-rvision-blue to-rvision-blue/90">
      <div className="container mx-auto px-4">
        <ServicesHeader title={sectionTitle} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            asChild
            className="bg-rvision-orange hover:bg-rvision-orange/90 text-white px-8"
          >
            <Link to="/services">
              {t('nav.services')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
