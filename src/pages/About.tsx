
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Helper type for content
type AboutContent = {
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  quality: string;
  innovation: string;
  professionalism: string;
  timeliness: string;
  coreValues: string;
  quality_title: string;
  innovation_title: string;
  professionalism_title: string;
  timeliness_title: string;
  [key: string]: string;
};

const About: React.FC = () => {
  const { t, isGeorgian } = useLanguage();

  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['about-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_page')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div>{isGeorgian ? 'იტვირთება...' : 'Loading...'}</div>
          </div>
        </div>
      </div>
    );
  }

  // Cast the JSON content to our helper type
  const content = (isGeorgian ? aboutData?.content_ka : aboutData?.content_en) as AboutContent;

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">
            {t('about.title')}
          </h1>

          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-lg border border-white/10 mb-10">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {t('about.companyName')}
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              {t('about.id')}
            </p>
            
            <div className="border-t border-white/10 my-8"></div>
            
            <div className="space-y-6 text-gray-300">
              <p>{content?.paragraph1}</p>
              <p>{content?.paragraph2}</p>
              <p>{content?.paragraph3}</p>
              <p>{content?.paragraph4}</p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-lg border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-8">
              {content?.coreValues}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="w-14 h-14 bg-rvision-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content?.quality_title}
                </h3>
                <p className="text-gray-300">
                  {content?.quality}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="w-14 h-14 bg-rvision-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content?.innovation_title}
                </h3>
                <p className="text-gray-300">
                  {content?.innovation}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="w-14 h-14 bg-rvision-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content?.professionalism_title}
                </h3>
                <p className="text-gray-300">
                  {content?.professionalism}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="w-14 h-14 bg-rvision-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content?.timeliness_title}
                </h3>
                <p className="text-gray-300">
                  {content?.timeliness}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
