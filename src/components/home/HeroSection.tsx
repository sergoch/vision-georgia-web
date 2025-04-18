
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  heroData: {
    hero_title_en: string;
    hero_title_ka: string;
    hero_subtitle_en: string;
    hero_subtitle_ka: string;
    hero_image_url: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroData }) => {
  const { t, isGeorgian } = useLanguage();
  
  return (
    <section className="h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{ 
          backgroundImage: heroData?.hero_image_url 
            ? `url('${heroData.hero_image_url}')` 
            : "url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=1500')", 
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rvision-blue/80 via-rvision-blue/70 to-rvision-blue"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex items-center relative z-10 pt-20">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {isGeorgian ? heroData?.hero_title_ka : heroData?.hero_title_en}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            {isGeorgian ? heroData?.hero_subtitle_ka : heroData?.hero_subtitle_en}
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
      </div>
    </section>
  );
};
