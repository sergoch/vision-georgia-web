
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Projects: React.FC = () => {
  const { t, isGeorgian } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: isGeorgian ? 'ყველა' : 'All' },
    { id: 'gis', name: 'GIS' },
    { id: 'drone', name: isGeorgian ? 'დრონით კვლევა' : 'Drone Surveying' },
    { id: 'mapping', name: isGeorgian ? 'კარტოგრაფირება' : 'Mapping' },
  ];

  const projects = [
    {
      id: 1,
      title: isGeorgian ? 'ბათუმის 3D რუკა' : '3D Map of Batumi',
      category: 'gis',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600',
      description: isGeorgian 
        ? 'ბათუმის დეტალური 3D რუკისა და სივრცითი მოდელის შექმნა ურბანული დაგეგმარებისთვის.'
        : 'Creation of a detailed 3D map and spatial model of Batumi for urban planning purposes.'
    },
    {
      id: 2,
      title: isGeorgian ? 'საავტომობილო გზის ტოპოგრაფიული კვლევა' : 'Highway Topographic Survey',
      category: 'mapping',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600',
      description: isGeorgian 
        ? 'ახალი საავტომობილო გზის მარშრუტის ტოპოგრაფიული კვლევა და რუკების შექმნა.'
        : 'Topographic survey and mapping of a new highway route.'
    },
    {
      id: 3,
      title: isGeorgian ? 'დრონით LIDAR სკანირება' : 'Drone LIDAR Scanning',
      category: 'drone',
      image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=600',
      description: isGeorgian 
        ? 'LIDAR ტექნოლოგიის გამოყენებით დრონით სკანირება მიწის ზუსტი 3D მოდელის შესაქმნელად.'
        : 'Drone scanning using LIDAR technology to create an accurate 3D model of the terrain.'
    },
    {
      id: 4,
      title: isGeorgian ? 'GIS ვებ-აპლიკაცია' : 'GIS Web Application',
      category: 'gis',
      image: 'https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?auto=format&fit=crop&w=600',
      description: isGeorgian 
        ? 'ინტერაქტიული GIS ვებ-აპლიკაციის შექმნა ქალაქის დაგეგმარებისა და განვითარებისთვის.'
        : 'Development of an interactive GIS web application for city planning and development.'
    },
    {
      id: 5,
      title: isGeorgian ? 'მდინარის აუზის კარტოგრაფირება' : 'River Basin Mapping',
      category: 'mapping',
      image: 'https://images.unsplash.com/photo-1505245208761-ba872912fac0?auto=format&fit=crop&w=600',
      description: isGeorgian 
        ? 'მდინარის აუზის დეტალური კარტოგრაფირება და წყლის რესურსების მართვის გეგმების შემუშავება.'
        : 'Detailed mapping of a river basin and development of water resource management plans.'
    },
    {
      id: 6,
      title: isGeorgian ? 'სასოფლო-სამეურნეო მიწების მონიტორინგი' : 'Agricultural Land Monitoring',
      category: 'drone',
      image: 'https://images.unsplash.com/photo-1562155618-e1a8bc2aaf52?auto=format&fit=crop&w=600',
      description: isGeorgian 
        ? 'დრონების გამოყენებით სასოფლო-სამეურნეო მიწების მონიტორინგი და ანალიზი.'
        : 'Monitoring and analysis of agricultural lands using drones.'
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden group hover:border-rvision-orange/50 transition-all"
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-rvision-orange/90 text-white text-xs font-semibold py-1 px-3 rounded-full">
                    {categories.find(cat => cat.id === project.category)?.name}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <a 
                    href="#" 
                    className="inline-block text-rvision-orange hover:underline text-sm font-medium mt-2"
                  >
                    {isGeorgian ? 'პროექტის დეტალები' : 'Project Details'}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* More Projects CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6">
              {isGeorgian 
                ? 'დაინტერესებული ხართ მსგავსი პროექტით? დაგვიკავშირდით დღესვე.'
                : 'Interested in a similar project? Contact us today.'}
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-rvision-orange hover:bg-rvision-orange/90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              {isGeorgian ? 'დაგვიკავშირდით' : 'Contact Us'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
