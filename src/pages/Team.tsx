
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Linkedin } from 'lucide-react';

const Team: React.FC = () => {
  const { isGeorgian } = useLanguage();

  const teamMembers = [
    {
      id: 1,
      name: 'გიორგი მაისურაძე | George Maisuradze',
      title: isGeorgian ? 'აღმასრულებელი დირექტორი' : 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500',
      bio: isGeorgian 
        ? '20+ წლიანი გამოცდილებით სამოქალაქო მშენებლობისა და გეოდეზიის სფეროში.'
        : '20+ years of experience in civil engineering and geodesy.',
      email: 'giorgi@rvision.ge',
    },
    {
      id: 2,
      name: 'ნინო დუმბაძე | Nino Dumbadze',
      title: isGeorgian ? 'ტექნიკური დირექტორი' : 'Chief Technical Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500',
      bio: isGeorgian 
        ? 'GIS სპეციალისტი და პროგრამული უზრუნველყოფის ინჟინერი 15+ წლიანი გამოცდილებით.'
        : 'GIS specialist and software engineer with 15+ years of experience.',
      email: 'nino@rvision.ge',
    },
    {
      id: 3,
      name: 'ლევან ბერიძე | Levan Beridze',
      title: isGeorgian ? 'უფროსი გეოდეზისტი' : 'Senior Geodesist',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500',
      bio: isGeorgian 
        ? 'სპეციალიზირებულია პრეციზიულ ტოპოგრაფიულ კვლევებში და 3D მოდელირებაში.'
        : 'Specialized in precision topographic surveys and 3D modeling.',
      email: 'levan@rvision.ge',
    },
    {
      id: 4,
      name: 'თამარ ცინცაძე | Tamar Tsintsadze',
      title: isGeorgian ? 'GIS ანალიტიკოსი' : 'GIS Analyst',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500',
      bio: isGeorgian 
        ? 'სივრცითი მონაცემების ანალიზის და GIS რუკების შექმნის ექსპერტი.'
        : 'Expert in spatial data analysis and GIS mapping.',
      email: 'tamar@rvision.ge',
    },
    {
      id: 5,
      name: 'დავით ჩიქოვანი | David Chikovani',
      title: isGeorgian ? 'დრონების სპეციალისტი' : 'Drone Specialist',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500',
      bio: isGeorgian 
        ? 'დრონების ოპერაციების და LIDAR ტექნოლოგიების სპეციალისტი 8+ წლიანი გამოცდილებით.'
        : 'Specialist in drone operations and LIDAR technologies with 8+ years of experience.',
      email: 'david@rvision.ge',
    },
    {
      id: 6,
      name: 'ანა კვარაცხელია | Ana Kvaratskhelia',
      title: isGeorgian ? 'პროექტის მენეჯერი' : 'Project Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500',
      bio: isGeorgian 
        ? 'გუნდების კოორდინირება და პროექტების მართვა დროისა და ბიუჯეტის ფარგლებში.'
        : 'Coordinates teams and manages projects within time and budget constraints.',
      email: 'ana@rvision.ge',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            {isGeorgian ? 'ჩვენი გუნდი' : 'Our Team'}
          </h1>
          <p className="text-gray-300 text-lg mb-16 max-w-3xl mx-auto text-center">
            {isGeorgian 
              ? 'გაიცანით Real Vision-ის პროფესიონალები, რომლებიც ყოველდღიურად მუშაობენ ჩვენი კლიენტების წარმატებისთვის.'
              : 'Meet the professionals at Real Vision who work every day to ensure the success of our clients.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map(member => (
              <div 
                key={member.id} 
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden group hover:border-rvision-orange/50 transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-rvision-orange mb-3">
                    {member.title}
                  </p>
                  <p className="text-gray-300 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="p-2 bg-white/10 rounded-full hover:bg-rvision-orange/20 transition-colors"
                      title={member.email}
                    >
                      <Mail size={18} className="text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="p-2 bg-white/10 rounded-full hover:bg-rvision-orange/20 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin size={18} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Join the team section */}
          <div className="mt-20 text-center bg-gradient-to-r from-rvision-green/20 to-rvision-blue/70 p-10 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              {isGeorgian ? 'შემოგვიერთდით' : 'Join Our Team'}
            </h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              {isGeorgian 
                ? 'დაინტერესებული ხართ ჩვენს გუნდში მუშაობით? გამოგვიგზავნეთ თქვენი რეზიუმე და გვიამბეთ, რატომ გსურთ ჩვენთან თანამშრომლობა.'
                : 'Interested in working with our team? Send us your resume and tell us why you want to work with us.'}
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-rvision-orange hover:bg-rvision-orange/90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              {isGeorgian ? 'კარიერა' : 'Careers'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
