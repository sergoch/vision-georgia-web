
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroContentProps {
  titleEn: string;
  titleKa: string;
  subtitleEn: string;
  subtitleKa: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  titleEn,
  titleKa,
  subtitleEn,
  subtitleKa,
}) => {
  const { t, isGeorgian } = useLanguage();

  return (
    <div className="max-w-3xl animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        {isGeorgian ? titleKa : titleEn}
      </h1>
      <p className="text-xl md:text-2xl text-white/90 mb-10">
        {isGeorgian ? subtitleKa : subtitleEn}
      </p>
      <div className="flex flex-wrap gap-4">
        <Button 
          asChild
          className="bg-rvision-orange hover:bg-rvision-orange/90 text-white px-8 py-6"
        >
          <Link to="/services">
            {t('nav.services')}
          </Link>
        </Button>
        <Button 
          asChild
          variant="outline" 
          className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6"
        >
          <Link to="/about">
            {t('home.learnMore')} <ArrowRight className="ml-2" size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};
