
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AboutPageForm from '@/components/admin/about/AboutPageForm';

const AboutAdminContent = () => {
  const { isGeorgian } = useLanguage();

  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['admin-about-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_page')
        .select('*')
        .single();
      
      if (error) throw error;
      
      // Parse JSON content if it's returned as strings
      if (data) {
        return {
          id: data.id,
          content_en: typeof data.content_en === 'string' 
            ? JSON.parse(data.content_en) 
            : data.content_en,
          content_ka: typeof data.content_ka === 'string'
            ? JSON.parse(data.content_ka)
            : data.content_ka,
          updated_at: data.updated_at
        };
      }
      
      return data;
    },
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div>{isGeorgian ? 'იტვირთება...' : 'Loading...'}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          {isGeorgian ? 'ჩვენს შესახებ გვერდი' : 'About Page'}
        </h1>
        
        <div className="p-6 border rounded-lg">
          <AboutPageForm initialData={aboutData} />
        </div>
      </div>
    </AdminLayout>
  );
};

const AboutAdmin = () => {
  return (
    <LanguageProvider>
      <AboutAdminContent />
    </LanguageProvider>
  );
};

export default AboutAdmin;
