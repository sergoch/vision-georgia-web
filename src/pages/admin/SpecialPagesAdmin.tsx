
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import SpecialPageForm from '@/components/admin/special-pages/SpecialPageForm';

const SpecialPagesAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  
  const { data: specialPages, isLoading } = useQuery({
    queryKey: ['admin-special-pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('special_pages')
        .select('*');
      
      if (error) throw error;

      // Convert array to object with id as key
      return data.reduce((acc: any, page: any) => {
        acc[page.id] = page;
        return acc;
      }, {});
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
          {isGeorgian ? 'სპეციალური გვერდები' : 'Special Pages'}
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="home">
              {isGeorgian ? 'მთავარი გვერდი' : 'Home Page'}
            </TabsTrigger>
            <TabsTrigger value="contact">
              {isGeorgian ? 'კონტაქტი' : 'Contact Page'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-6">
            <div className="p-6 border rounded-lg">
              <SpecialPageForm 
                pageId="home" 
                initialData={specialPages?.home} 
              />
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="p-6 border rounded-lg">
              <SpecialPageForm 
                pageId="contact" 
                initialData={specialPages?.contact} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

const SpecialPagesAdmin = () => {
  return (
    <LanguageProvider>
      <SpecialPagesAdminContent />
    </LanguageProvider>
  );
};

export default SpecialPagesAdmin;
