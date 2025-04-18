
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProjectsSectionProps {
  projectData: {
    projects_title_en: string;
    projects_title_ka: string;
    projects_description_en: string;
    projects_description_ka: string;
    projects_image_url: string;
  };
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projectData }) => {
  const { t, isGeorgian } = useLanguage();
  
  return (
    <section className="py-20 bg-rvision-blue/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img 
              src={projectData?.projects_image_url || "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1500"} 
              alt="GIS Project" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6">
              {isGeorgian ? projectData?.projects_title_ka : projectData?.projects_title_en}
            </h2>
            <p className="text-gray-300 mb-6">
              {isGeorgian ? projectData?.projects_description_ka : projectData?.projects_description_en}
            </p>
            <Button 
              asChild
              className="bg-rvision-orange hover:bg-rvision-orange/90 text-white"
            >
              <Link to="/projects">
                {t('projects.title')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
