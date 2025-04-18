
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useAnalyticsSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isGeorgian } = useLanguage();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['analytics-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const updateSettings = async (formData: { tracking_id: string; is_enabled: boolean }) => {
    try {
      const { error } = await supabase
        .from('analytics_settings')
        .update(formData)
        .eq('id', settings?.id);

      if (error) throw error;

      toast({
        description: isGeorgian ? 'პარამეტრები განახლდა' : 'Settings updated successfully'
      });

      queryClient.invalidateQueries({ queryKey: ['analytics-settings'] });
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
