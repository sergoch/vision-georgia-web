
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Linkedin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Team: React.FC = () => {
  const { isGeorgian } = useLanguage();

  const { data: teamMembers, isLoading, error } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-48">
            <div className="text-lg text-white">{isGeorgian ? 'იტვირთება...' : 'Loading...'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-48">
            <div className="text-lg text-red-300 mb-2">
              {isGeorgian ? 'შეცდომა მოხდა' : 'An error occurred'}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {teamMembers && teamMembers.map(member => (
              <div 
                key={member.id} 
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden group hover:border-rvision-orange/50 transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500'} 
                    alt={isGeorgian ? member.name_ka : member.name_en}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {isGeorgian ? member.name_ka : member.name_en}
                  </h3>
                  <p className="text-rvision-orange mb-3">
                    {isGeorgian ? member.title_ka : member.title_en}
                  </p>
                  <p className="text-gray-300 mb-4">
                    {isGeorgian ? member.bio_ka : member.bio_en}
                  </p>
                  <div className="flex space-x-3">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`} 
                        className="p-2 bg-white/10 rounded-full hover:bg-rvision-orange/20 transition-colors"
                        title={member.email}
                      >
                        <Mail size={18} className="text-white" />
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a 
                        href={member.linkedin_url} 
                        className="p-2 bg-white/10 rounded-full hover:bg-rvision-orange/20 transition-colors"
                        title="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin size={18} className="text-white" />
                      </a>
                    )}
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
