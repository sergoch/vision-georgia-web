
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';

export interface HomeFormData {
  hero_title_en: string;
  hero_title_ka: string;
  hero_subtitle_en: string;
  hero_subtitle_ka: string;
  hero_image_url: string;
  services_title_en: string;
  services_title_ka: string;
  projects_title_en: string;
  projects_title_ka: string;
  projects_description_en: string;
  projects_description_ka: string;
  projects_image_url: string;
  contact_title_en: string;
  contact_title_ka: string;
  contact_description_en: string;
  contact_description_ka: string;
}

export const useHomeForm = (initialData: any) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isGeorgian } = useLanguage();
  const [uploading, setUploading] = useState(false);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<HomeFormData>({
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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          ...formData,
          hero_image_url: heroImageUrl,
          projects_image_url: projectImageUrl,
        })
        .eq('id', initialData.id);

      if (error) throw error;

      toast({
        description: isGeorgian ? 'მთავარი გვერდი წარმატებით განახლდა' : 'Home page updated successfully',
      });

      queryClient.invalidateQueries({ queryKey: ['home-page'] });
      queryClient.invalidateQueries({ queryKey: ['admin-home-page'] });
    } catch (error: any) {
      console.error('Error updating home page:', error);
      toast({
        variant: "destructive",
        title: isGeorgian ? 'შეცდომა' : 'Error',
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  return {
    formData,
    uploading,
    heroImageFile,
    projectImageFile,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
};
