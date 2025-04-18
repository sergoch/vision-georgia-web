
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { HeroSection } from '@/components/admin/home/HeroSection';
import { ServicesSection } from '@/components/admin/home/ServicesSection';
import { ProjectsSection } from '@/components/admin/home/ProjectsSection';
import { ContactSection } from '@/components/admin/home/ContactSection';
import { useHomeForm } from '@/hooks/use-home-form';

const HomeAdminContent = () => {
  const { isGeorgian } = useLanguage();

  const { data: homePageData, isLoading } = useQuery({
    queryKey: ['admin-home-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('home_page')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const {
    formData,
    uploading,
    heroImageFile,
    projectImageFile,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  } = useHomeForm(homePageData);

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
          {isGeorgian ? 'მთავარი გვერდის რედაქტირება' : 'Edit Home Page'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <HeroSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            heroImageFile={heroImageFile}
          />

          <ServicesSection
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <ProjectsSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            projectImageFile={projectImageFile}
          />

          <ContactSection
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <Button type="submit" className="w-full" disabled={uploading}>
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGeorgian ? 'შენახვა' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

const HomeAdmin = () => {
  return (
    <LanguageProvider>
      <HomeAdminContent />
    </LanguageProvider>
  );
};

export default HomeAdmin;
