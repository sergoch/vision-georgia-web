
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useSeoSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isGeorgian } = useLanguage();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['seo-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const updateSettings = async (formData: {
    site_title: string;
    site_description_en: string;
    site_description_ka: string;
    site_keywords: string;
    og_image_url?: string;
    twitter_handle?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('seo_settings')
        .update(formData)
        .eq('id', settings?.id);

      if (error) throw error;

      toast({
        description: isGeorgian ? 'SEO პარამეტრები განახლდა' : 'SEO settings updated successfully'
      });

      queryClient.invalidateQueries({ queryKey: ['seo-settings'] });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message
      });
    }
  };

  return {
    settings,
    isLoading,
    updateSettings
  };
};
