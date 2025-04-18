
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Projects: React.FC = () => {
  const { t, isGeorgian } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: isGeorgian ? 'ყველა' : 'All' },
    { id: 'gis', name: 'GIS' },
    { id: 'drone', name: isGeorgian ? 'დრონით კვლევა' : 'Drone Surveying' },
    { id: 'mapping', name: isGeorgian ? 'კარტოგრაფირება' : 'Mapping' },
  ];

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
            {t('projects.title')}
          </h1>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-rvision-orange text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-white/5 h-64 rounded-lg mb-4"></div>
                  <div className="h-6 bg-white/5 rounded w-3/4 mb-2"></div>
                  <div className="h-20 bg-white/5 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <div 
                  key={project.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden group hover:border-rvision-orange/50 transition-all"
                >
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={project.image_url} 
                      alt={isGeorgian ? project.title_ka : project.title_en}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-rvision-orange/90 text-white text-xs font-semibold py-1 px-3 rounded-full">
                      {categories.find(cat => cat.id === project.category)?.name}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {isGeorgian ? project.title_ka : project.title_en}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {isGeorgian ? project.description_ka : project.description_en}
                    </p>
                    <Link 
                      to={`/projects/${project.id}`}
                      className="inline-block text-rvision-orange hover:underline text-sm font-medium mt-2"
                    >
                      {isGeorgian ? 'პროექტის დეტალები' : 'Project Details'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* More Projects CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6">
              {isGeorgian 
                ? 'დაინტერესებული ხართ მსგავსი პროექტით? დაგვიკავშირდით დღესვე.'
                : 'Interested in a similar project? Contact us today.'}
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-rvision-orange hover:bg-rvision-orange/90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              {isGeorgian ? 'დაგვიკავშირდით' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
