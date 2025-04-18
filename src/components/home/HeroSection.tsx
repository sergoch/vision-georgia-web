
import React from 'react';
import { HeroBackground } from './hero/HeroBackground';
import { HeroContent } from './hero/HeroContent';

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
  return (
    <section className="h-screen relative overflow-hidden">
      <HeroBackground imageUrl={heroData?.hero_image_url} />
      <div className="container mx-auto px-4 h-full flex items-center relative z-10 pt-20">
        <HeroContent
          titleEn={heroData?.hero_title_en}
          titleKa={heroData?.hero_title_ka}
          subtitleEn={heroData?.hero_subtitle_en}
          subtitleKa={heroData?.hero_subtitle_ka}
        />
      </div>
    </section>
  );
};
