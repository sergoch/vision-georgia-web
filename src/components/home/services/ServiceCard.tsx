
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Service } from '@/types/home-page';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { t, isGeorgian } = useLanguage();
  
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all group">
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
  );
};
