
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useCeoInfo = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isGeorgian } = useLanguage();

  const { data: ceoInfo, isLoading } = useQuery({
    queryKey: ['ceo-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ceo_info')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const handleUpdate = async (formData: any) => {
    try {
      const { error } = await supabase
        .from('ceo_info')
        .update(formData)
        .eq('id', ceoInfo?.id);

      if (error) throw error;

      toast({
        description: isGeorgian ? 'ინფორმაცია განახლდა' : 'Information updated successfully'
      });

      queryClient.invalidateQueries({ queryKey: ['ceo-info'] });
      setIsFormOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message
      });
    }
  };

  return {
    ceoInfo,
    isLoading,
    isFormOpen,
    setIsFormOpen,
    handleUpdate
  };
};
