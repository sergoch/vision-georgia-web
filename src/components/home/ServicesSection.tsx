
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  title_en: string;
  title_ka: string;
  description_en: string;
  description_ka: string;
  image_url: string;
}

interface ServicesSectionProps {
  services: Service[] | null;
  sectionTitle: {
    services_title_en: string;
    services_title_ka: string;
  };
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, sectionTitle }) => {
  const { t, isGeorgian } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-b from-rvision-blue to-rvision-blue/90">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-16">
          {isGeorgian ? sectionTitle.services_title_ka : sectionTitle.services_title_en}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div key={service.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-rvision-green/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-rvision-green/30 transition-colors">
                <img 
                  src={service.image_url} 
                  alt={isGeorgian ? service.title_ka : service.title_en}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {isGeorgian ? service.title_ka : service.title_en}
              </h3>
              <p className="text-gray-300 mb-6">
                {isGeorgian ? service.description_ka : service.description_en}
              </p>
              <Link to={`/services/${service.id}`} className="text-rvision-orange hover:underline flex items-center">
                {t('home.learnMore')} <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
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
