
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ServiceCard } from './services/ServiceCard';
import { ServicesHeader } from './services/ServicesHeader';
import type { Service } from '@/types/home-page';
import { ChevronRight } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[] | null;
  sectionTitle: {
    services_title_en: string;
    services_title_ka: string;
  };
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, sectionTitle }) => {
  const { t, isGeorgian } = useLanguage();
  
  // Take only the first 3 services
  const displayedServices = services?.slice(0, 3) || [];
  const hasMoreServices = services && services.length > 3;
  
  return (
    <section className="py-20 bg-gradient-to-b from-rvision-blue to-rvision-blue/90">
      <div className="container mx-auto px-4">
        <ServicesHeader title={sectionTitle} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        
        {hasMoreServices && (
          <div className="text-center mt-16">
            <Button 
              asChild
              className="bg-rvision-orange hover:bg-rvision-orange/90 text-white px-8"
            >
              <Link to="/services">
                {isGeorgian ? 'მეტის ნახვა' : 'More Services'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
