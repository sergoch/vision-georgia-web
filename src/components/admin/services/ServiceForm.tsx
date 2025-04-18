
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { ServiceFormFields } from './ServiceFormFields';
import { ServiceImageUpload } from './ServiceImageUpload';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ServiceFormProps {
  initialData?: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ServiceForm = ({ initialData, isOpen, onClose, onSuccess }: ServiceFormProps) => {
  const { isGeorgian } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title_en: '',
      title_ka: '',
      description_en: '',
      description_ka: '',
      full_description_en: '',
      full_description_ka: ''
    }
  });

  // Reset form and image when dialog opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      console.log('Initializing service form with data:', initialData);
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
        } else {
          setImagePreview('');
        }
      } else {
        form.reset({
          title_en: '',
          title_ka: '',
          description_en: '',
          description_ka: '',
          full_description_en: '',
          full_description_ka: ''
        });
        setImagePreview('');
      }
      setImageFile(null);
    }
  }, [isOpen, initialData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      console.log('Image selected:', file.name);
    }
  };

  const onSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    setLoading(true);
    
    try {
      let image_url = initialData?.image_url || '';
      
      // Handle image upload if there's a new image
      if (imageFile) {
        // Generate a unique filename based on timestamp and random string
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 10);
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `service_${timestamp}_${randomString}.${fileExt}`;
        const filePath = `services/${fileName}`;
        
        console.log('Uploading image:', filePath);
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('site-images')
          .upload(filePath, imageFile);
          
        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('site-images')
          .getPublicUrl(filePath);
          
        console.log('Image uploaded successfully, public URL:', publicUrl);
        image_url = publicUrl;
      }
      
      // Prepare the service data
      const now = new Date().toISOString();
      const serviceData = {
        title_en: data.title_en,
        title_ka: data.title_ka,
        description_en: data.description_en,
        description_ka: data.description_ka,
        full_description_en: data.full_description_en,
        full_description_ka: data.full_description_ka,
        image_url,
        updated_at: now
      };
      
      if (initialData?.id) {
        // Update existing service
        console.log('Updating service with ID:', initialData.id);
        console.log('Update data:', serviceData);
        
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', initialData.id);
          
        if (error) {
          console.error('Error updating service:', error);
          throw new Error(`Update failed: ${error.message}`);
        }
        
        console.log('Service updated successfully');
      } else {
        // Create new service
        console.log('Creating new service');
        console.log('Insert data:', {
          ...serviceData,
          created_at: now
        });
        
        const { error } = await supabase
          .from('services')
          .insert([{
            ...serviceData,
            created_at: now
          }]);
          
        if (error) {
          console.error('Error creating service:', error);
          throw new Error(`Create failed: ${error.message}`);
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
        title: isGeorgian ? 'შეცდომა' : 'Error',
        description: error.message || (isGeorgian ? 'დაფიქსირდა შეცდომა' : 'An error occurred')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !loading) onClose();
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id 
              ? (isGeorgian ? 'სერვისის რედაქტირება' : 'Edit Service')
              : (isGeorgian ? 'ახალი სერვისი' : 'New Service')
            }
          </DialogTitle>
          <DialogDescription>
            {isGeorgian 
              ? 'შეავსეთ ფორმა სერვისის დასამატებლად ან განსაახლებლად' 
              : 'Fill out the form to add or update a service'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ServiceFormFields 
            form={form} 
            errors={form.formState.errors} 
          />
          
          <ServiceImageUpload 
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
          />
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              {isGeorgian ? 'გაუქმება' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData?.id 
                ? (isGeorgian ? 'განახლება' : 'Update') 
                : (isGeorgian ? 'დამატება' : 'Add')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
