
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useImageDelete } from '@/hooks/use-image-delete';
import { useLanguage } from '@/contexts/LanguageContext';

export const useServices = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [serviceToDelete, setServiceToDelete] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { deleteImage } = useImageDelete();
  const { isGeorgian } = useLanguage();

  const { data: services, isLoading, error } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      console.log('Fetching services for admin panel');
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }
      console.log('Services fetched:', data);
      return data || [];
    },
  });

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    
    console.log('Deleting service:', serviceToDelete);
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceToDelete.id);
        
      if (error) {
        console.error("Error deleting service:", error);
        throw error;
      }
      
      if (serviceToDelete.image_url) {
        await deleteImage(serviceToDelete.image_url);
      }
      
      toast({
        description: isGeorgian ? 'სერვისი წაიშალა' : 'Service deleted successfully'
      });
      
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
    } catch (error: any) {
      console.error('Error deleting service:', error);
      toast({
        variant: "destructive",
        description: error.message
      });
    } finally {
      setServiceToDelete(null);
    }
  };

  const handleEdit = (service: any) => {
    console.log('Editing service:', service);
    setSelectedService(JSON.parse(JSON.stringify(service))); // Deep copy
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    console.log('Form submitted successfully');
    queryClient.invalidateQueries({ queryKey: ['admin-services'] });
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedService(null);
  };

  return {
    services,
    isLoading,
    error,
    isFormOpen,
    selectedService,
    serviceToDelete,
    setServiceToDelete,
    setIsFormOpen,
    handleDelete,
    handleEdit,
    handleFormSuccess,
    handleFormClose
  };
};
