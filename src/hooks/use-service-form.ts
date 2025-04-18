
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceFormData {
  title_en: string;
  title_ka: string;
  description_en: string;
  description_ka: string;
  full_description_en: string;
  full_description_ka: string;
}

interface UseServiceFormProps {
  initialData: any;
  onSuccess: () => void;
  onClose: () => void;
}

export const useServiceForm = ({
  initialData,
  onSuccess,
  onClose
}: UseServiceFormProps) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const { toast } = useToast();
  const { isGeorgian } = useLanguage();
  
  const form = useForm<ServiceFormData>({
    defaultValues: {
      title_en: '',
      title_ka: '',
      description_en: '',
      description_ka: '',
      full_description_en: '',
      full_description_ka: ''
    }
  });

  // Load initial data when editing
  useEffect(() => {
    if (initialData) {
      form.reset({
        title_en: initialData.title_en || '',
        title_ka: initialData.title_ka || '',
        description_en: initialData.description_en || '',
        description_ka: initialData.description_ka || '',
        full_description_en: initialData.full_description_en || '',
        full_description_ka: initialData.full_description_ka || ''
      });
      
      if (initialData.image_url) {
        setImagePreview(initialData.image_url);
      }
    } else {
      // Reset form when creating new
      form.reset({
        title_en: '',
        title_ka: '',
        description_en: '',
        description_ka: '',
        full_description_en: '',
        full_description_ka: ''
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [initialData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    setLoading(true);
    console.log('Submitting service form:', { data, initialData, imageFile });
    
    try {
      let image_url = initialData?.image_url || '';
      
      // Handle image upload if there's a new image
      if (imageFile) {
        // Generate a unique filename
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `services/${fileName}`;
        
        console.log('Uploading image:', filePath);
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('site-images')
          .upload(filePath, imageFile);
          
        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw uploadError;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('site-images')
          .getPublicUrl(filePath);
          
        console.log('Image uploaded successfully:', publicUrl);
        image_url = publicUrl;
      }
      
      // Get the current timestamp for updated_at
      const now = new Date().toISOString();
      
      if (initialData?.id) {
        // Update existing service
        console.log('Updating service:', initialData.id);
        
        const { error } = await supabase
          .from('services')
          .update({
            title_en: data.title_en,
            title_ka: data.title_ka,
            description_en: data.description_en,
            description_ka: data.description_ka,
            full_description_en: data.full_description_en,
            full_description_ka: data.full_description_ka,
            ...(imageFile ? { image_url } : {}),
            updated_at: now
          })
          .eq('id', initialData.id);
          
        if (error) {
          console.error('Error updating service:', error);
          throw error;
        }
        
        console.log('Service updated successfully');
      } else {
        // Create new service
        console.log('Creating new service');
        
        const { error } = await supabase
          .from('services')
          .insert([{
            title_en: data.title_en,
            title_ka: data.title_ka,
            description_en: data.description_en,
            description_ka: data.description_ka,
            full_description_en: data.full_description_en,
            full_description_ka: data.full_description_ka,
            image_url,
            created_at: now,
            updated_at: now
          }]);
          
        if (error) {
          console.error('Error creating service:', error);
          throw error;
        }
        
        console.log('Service created successfully');
      }
      
      toast({
        description: initialData?.id 
          ? (isGeorgian ? 'სერვისი წარმატებით განახლდა' : 'Service updated successfully') 
          : (isGeorgian ? 'სერვისი წარმატებით დაემატა' : 'Service added successfully')
      });
      
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving service:', error);
      toast({
        variant: "destructive",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    imagePreview,
    handleImageChange,
    onSubmit
  };
};
