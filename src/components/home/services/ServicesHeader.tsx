
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServicesHeaderProps {
  title: {
    services_title_en: string;
    services_title_ka: string;
  };
}

export const ServicesHeader: React.FC<ServicesHeaderProps> = ({ title }) => {
  const { isGeorgian } = useLanguage();
  
  return (
    <h2 className="text-3xl font-bold text-white text-center mb-16">
      {isGeorgian ? title.services_title_ka : title.services_title_en}
    </h2>
  );
};
