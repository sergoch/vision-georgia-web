import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

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

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleImageUpload = async (imageFile: File | null, section: 'hero' | 'projects') => {
    if (!imageFile) return null;

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${section}-image-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `site-images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, imageFile);
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message
      });
      return null;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, section: 'hero' | 'projects') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (section === 'hero') {
        setHeroImageFile(file);
      } else {
        setProjectImageFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      const heroImageUrl = heroImageFile 
        ? await handleImageUpload(heroImageFile, 'hero') 
        : formData.hero_image_url;

      const projectImageUrl = projectImageFile 
        ? await handleImageUpload(projectImageFile, 'projects') 
        : formData.projects_image_url;

      const { error } = await supabase
        .from('home_page')
        .update({
          hero_title_en: formData.hero_title_en,
          hero_title_ka: formData.hero_title_ka,
          hero_subtitle_en: formData.hero_subtitle_en,
          hero_subtitle_ka: formData.hero_subtitle_ka,
          hero_image_url: heroImageUrl,
          services_title_en: formData.services_title_en,
          services_title_ka: formData.services_title_ka,
          projects_title_en: formData.projects_title_en,
          projects_title_ka: formData.projects_title_ka,
          projects_description_en: formData.projects_description_en,
          projects_description_ka: formData.projects_description_ka,
          projects_image_url: projectImageUrl,
          contact_title_en: formData.contact_title_en,
          contact_title_ka: formData.contact_title_ka,
          contact_description_en: formData.contact_description_en,
          contact_description_ka: formData.contact_description_ka,
        })
        .eq('id', homePageData.id);

      if (error) throw error;

      toast({
        description: isGeorgian ? 'მთავარი გვერდი წარმატებით განახლდა' : 'Home page updated successfully',
      });

      queryClient.invalidateQueries({ queryKey: ['home-page'] });
      queryClient.invalidateQueries({ queryKey: ['admin-home-page'] });
    } catch (error: any) {
      console.error('Error updating home page:', error);
      toast({
        variant: 'destructive',
        title: isGeorgian ? 'შეცდომა' : 'Error',
        description: error.message,
      });
    } finally {
      setUploading(false);
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
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'გმირის სექცია' : 'Hero Section'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero_title_en">Hero Title (English)</Label>
                <Input
                  id="hero_title_en"
                  name="hero_title_en"
                  value={formData.hero_title_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_title_ka">Hero Title (Georgian)</Label>
                <Input
                  id="hero_title_ka"
                  name="hero_title_ka"
                  value={formData.hero_title_ka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_subtitle_en">Hero Subtitle (English)</Label>
                <Textarea
                  id="hero_subtitle_en"
                  name="hero_subtitle_en"
                  placeholder="Hero Subtitle (English)"
                  value={formData.hero_subtitle_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_subtitle_ka">Hero Subtitle (Georgian)</Label>
                <Textarea
                  id="hero_subtitle_ka"
                  name="hero_subtitle_ka"
                  placeholder="Hero Subtitle (Georgian)"
                  value={formData.hero_subtitle_ka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_image">Hero Image</Label>
                <Input
                  id="hero_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'hero')}
                />
                {(formData.hero_image_url || heroImageFile) && (
                  <div className="mt-2">
                    <img 
                      src={heroImageFile ? URL.createObjectURL(heroImageFile) : formData.hero_image_url} 
                      alt="Hero Preview" 
                      className="w-full max-h-64 object-cover rounded-md border" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'სერვისების სექცია' : 'Services Section'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="services_title_en">Services Title (English)</Label>
                <Input
                  id="services_title_en"
                  name="services_title_en"
                  value={formData.services_title_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services_title_ka">Services Title (Georgian)</Label>
                <Input
                  id="services_title_ka"
                  name="services_title_ka"
                  value={formData.services_title_ka}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'პროექტების სექცია' : 'Projects Section'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projects_title_en">Projects Title (English)</Label>
                <Input
                  id="projects_title_en"
                  name="projects_title_en"
                  value={formData.projects_title_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projects_title_ka">Projects Title (Georgian)</Label>
                <Input
                  id="projects_title_ka"
                  name="projects_title_ka"
                  value={formData.projects_title_ka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projects_description_en">Projects Description (English)</Label>
                <Textarea
                  id="projects_description_en"
                  name="projects_description_en"
                  placeholder="Projects Description (English)"
                  value={formData.projects_description_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projects_description_ka">Projects Description (Georgian)</Label>
                <Textarea
                  id="projects_description_ka"
                  name="projects_description_ka"
                  placeholder="Projects Description (Georgian)"
                  value={formData.projects_description_ka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projects_image">Projects Image</Label>
                <Input
                  id="projects_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'projects')}
                />
                {(formData.projects_image_url || projectImageFile) && (
                  <div className="mt-2">
                    <img 
                      src={projectImageFile ? URL.createObjectURL(projectImageFile) : formData.projects_image_url} 
                      alt="Projects Preview" 
                      className="w-full max-h-64 object-cover rounded-md border" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'კონტაქტის სექცია' : 'Contact Section'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_title_en">Contact Title (English)</Label>
                <Input
                  id="contact_title_en"
                  name="contact_title_en"
                  value={formData.contact_title_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_title_ka">Contact Title (Georgian)</Label>
                <Input
                  id="contact_title_ka"
                  name="contact_title_ka"
                  value={formData.contact_title_ka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_description_en">Contact Description (English)</Label>
                <Textarea
                  id="contact_description_en"
                  name="contact_description_en"
                  placeholder="Contact Description (English)"
                  value={formData.contact_description_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_description_ka">Contact Description (Georgian)</Label>
                <Textarea
                  id="contact_description_ka"
                  name="contact_description_ka"
                  placeholder="Contact Description (Georgian)"
                  value={formData.contact_description_ka}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

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
