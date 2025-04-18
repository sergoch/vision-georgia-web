
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ContactPageForm from '@/components/admin/contact/ContactPageForm';

const ContactAdminContent = () => {
  const { isGeorgian } = useLanguage();
  
  const { data: contactPageData, isLoading } = useQuery({
    queryKey: ['admin-contact-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single();
      
      if (error) throw error;

      // Parse JSON content if it's returned as strings
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
          {isGeorgian ? 'კონტაქტის გვერდი' : 'Contact Page'}
        </h1>
        
        <div className="p-6 border rounded-lg">
          <ContactPageForm initialData={contactPageData} />
        </div>
      </div>
    </AdminLayout>
  );
};

const ContactAdmin = () => {
  return (
    <LanguageProvider>
      <ContactAdminContent />
    </LanguageProvider>
  );
};

export default ContactAdmin;
