
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const HomeAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const [formData, setFormData] = useState({
    hero_title_en: '',
    hero_title_ka: '',
    hero_subtitle_en: '',
    hero_subtitle_ka: '',
    hero_image_url: '',
    services_title_en: '',
    services_title_ka: '',
    projects_title_en: '',
    projects_title_ka: '',
    projects_description_en: '',
    projects_description_ka: '',
    projects_image_url: '',
    contact_title_en: '',
    contact_title_ka: '',
    contact_description_en: '',
    contact_description_ka: '',
  });

  // Populate form data when homePageData loads
  useEffect(() => {
    if (homePageData) {
      setFormData({
        hero_title_en: homePageData.hero_title_en,
        hero_title_ka: homePageData.hero_title_ka,
        hero_subtitle_en: homePageData.hero_subtitle_en,
        hero_subtitle_ka: homePageData.hero_subtitle_ka,
        hero_image_url: homePageData.hero_image_url || '',
        services_title_en: homePageData.services_title_en,
        services_title_ka: homePageData.services_title_ka,
        projects_title_en: homePageData.projects_title_en,
        projects_title_ka: homePageData.projects_title_ka,
        projects_description_en: homePageData.projects_description_en,
        projects_description_ka: homePageData.projects_description_ka,
        projects_image_url: homePageData.projects_image_url || '',
        contact_title_en: homePageData.contact_title_en,
        contact_title_ka: homePageData.contact_title_ka,
        contact_description_en: homePageData.contact_description_en,
        contact_description_ka: homePageData.contact_description_ka,
      });
    }
  }, [homePageData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Update the home page row (assuming only one row exists)
      const { error } = await supabase
        .from('home_page')
        .update({
          hero_title_en: formData.hero_title_en,
          hero_title_ka: formData.hero_title_ka,
          hero_subtitle_en: formData.hero_subtitle_en,
          hero_subtitle_ka: formData.hero_subtitle_ka,
          hero_image_url: formData.hero_image_url,
          services_title_en: formData.services_title_en,
          services_title_ka: formData.services_title_ka,
          projects_title_en: formData.projects_title_en,
          projects_title_ka: formData.projects_title_ka,
          projects_description_en: formData.projects_description_en,
          projects_description_ka: formData.projects_description_ka,
          projects_image_url: formData.projects_image_url,
          contact_title_en: formData.contact_title_en,
          contact_title_ka: formData.contact_title_ka,
          contact_description_en: formData.contact_description_en,
          contact_description_ka: formData.contact_description_ka,
        })
        .select();

      if (error) throw error;

      toast({
        description: isGeorgian ? 'მთავარი გვერდი წარმატებით განახლდა' : 'Home page updated successfully',
      });

      // Invalidate queries to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['home-page'] });
      queryClient.invalidateQueries({ queryKey: ['admin-home-page'] });
    } catch (error: any) {
      console.error('Error updating home page:', error);
      toast({
        variant: 'destructive',
        title: isGeorgian ? 'შეცდომა' : 'Error',
        description: error.message,
      });
    }
  };

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
          {/* Hero Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'გმირის სექცია' : 'Hero Section'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="hero_title_en"
                label="Hero Title (English)"
                value={formData.hero_title_en}
                onChange={handleInputChange}
              />
              <Input
                name="hero_title_ka"
                label="Hero Title (Georgian)"
                value={formData.hero_title_ka}
                onChange={handleInputChange}
              />
              <Textarea
                name="hero_subtitle_en"
                placeholder="Hero Subtitle (English)"
                value={formData.hero_subtitle_en}
                onChange={handleInputChange}
              />
              <Textarea
                name="hero_subtitle_ka"
                placeholder="Hero Subtitle (Georgian)"
                value={formData.hero_subtitle_ka}
                onChange={handleInputChange}
              />
              <Input
                name="hero_image_url"
                label="Hero Image URL"
                value={formData.hero_image_url}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Services Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'სერვისების სექცია' : 'Services Section'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="services_title_en"
                label="Services Title (English)"
                value={formData.services_title_en}
                onChange={handleInputChange}
              />
              <Input
                name="services_title_ka"
                label="Services Title (Georgian)"
                value={formData.services_title_ka}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Projects Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'პროექტების სექცია' : 'Projects Section'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="projects_title_en"
                label="Projects Title (English)"
                value={formData.projects_title_en}
                onChange={handleInputChange}
              />
              <Input
                name="projects_title_ka"
                label="Projects Title (Georgian)"
                value={formData.projects_title_ka}
                onChange={handleInputChange}
              />
              <Textarea
                name="projects_description_en"
                placeholder="Projects Description (English)"
                value={formData.projects_description_en}
                onChange={handleInputChange}
              />
              <Textarea
                name="projects_description_ka"
                placeholder="Projects Description (Georgian)"
                value={formData.projects_description_ka}
                onChange={handleInputChange}
              />
              <Input
                name="projects_image_url"
                label="Projects Image URL"
                value={formData.projects_image_url}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'კონტაქტის სექცია' : 'Contact Section'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="contact_title_en"
                label="Contact Title (English)"
                value={formData.contact_title_en}
                onChange={handleInputChange}
              />
              <Input
                name="contact_title_ka"
                label="Contact Title (Georgian)"
                value={formData.contact_title_ka}
                onChange={handleInputChange}
              />
              <Textarea
                name="contact_description_en"
                placeholder="Contact Description (English)"
                value={formData.contact_description_en}
                onChange={handleInputChange}
              />
              <Textarea
                name="contact_description_ka"
                placeholder="Contact Description (Georgian)"
                value={formData.contact_description_ka}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
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
