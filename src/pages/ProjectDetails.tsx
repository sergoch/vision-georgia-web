
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const ProjectDetails = () => {
  const { id } = useParams();
  const { isGeorgian } = useLanguage();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-white/5 h-8 w-48 rounded mb-4"></div>
          <div className="animate-pulse bg-white/5 h-64 rounded mb-6"></div>
          <div className="animate-pulse bg-white/5 h-32 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl text-white mb-4">
            {isGeorgian ? 'პროექტი ვერ მოიძებნა' : 'Project Not Found'}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {isGeorgian ? project.title_ka : project.title_en}
          </h1>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 mb-8">
            <img
              src={project.image_url}
              alt={isGeorgian ? project.title_ka : project.title_en}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {project.completion_date && (
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h3 className="text-white font-semibold mb-2">
                  {isGeorgian ? 'დასრულების თარიღი' : 'Completion Date'}
                </h3>
                <p className="text-gray-300">
                  {new Date(project.completion_date).toLocaleDateString(
                    isGeorgian ? 'ka-GE' : 'en-US'
                  )}
                </p>
              </div>
            )}
            {project.client && (
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h3 className="text-white font-semibold mb-2">
                  {isGeorgian ? 'კლიენტი' : 'Client'}
                </h3>
                <p className="text-gray-300">{project.client}</p>
              </div>
            )}
            {project.location && (
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h3 className="text-white font-semibold mb-2">
                  {isGeorgian ? 'მდებარეობა' : 'Location'}
                </h3>
                <p className="text-gray-300">{project.location}</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
            <p className="text-gray-300 whitespace-pre-line">
              {isGeorgian ? project.full_description_ka : project.full_description_en}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
