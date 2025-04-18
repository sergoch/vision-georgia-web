
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ContactSectionProps {
  contactData: {
    contact_title_en: string;
    contact_title_ka: string;
    contact_description_en: string;
    contact_description_ka: string;
  };
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactData }) => {
  const { t, isGeorgian } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-b from-rvision-blue/80 to-rvision-blue">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          {isGeorgian ? contactData?.contact_title_ka : contactData?.contact_title_en}
        </h2>
        <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
          {isGeorgian ? contactData?.contact_description_ka : contactData?.contact_description_en}
        </p>
        <Button 
          asChild
          className="bg-rvision-orange hover:bg-rvision-orange/90 text-white px-8 py-6"
        >
          <Link to="/contact">
            {t('nav.contact')}
          </Link>
        </Button>
      </div>
    </section>
  );
};
