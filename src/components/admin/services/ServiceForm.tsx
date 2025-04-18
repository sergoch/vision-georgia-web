
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ServiceFormProps {
  initialData?: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ServiceForm = ({ initialData, isOpen, onClose, onSuccess }: ServiceFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: initialData || {
      title_en: '',
      title_ka: '',
      description_en: '',
      description_ka: '',
      full_description_en: '',
      full_description_ka: ''
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url || '');
  
  const { toast } = useToast();
  const { isGeorgian } = useLanguage();

  // Update form when initialData changes
  React.useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as any, initialData[key]);
      });
      setImagePreview(initialData.image_url || '');
    }
  }, [initialData, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let image_url = initialData?.image_url || '';
      
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `services/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('site-images')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('site-images')
          .getPublicUrl(filePath);
          
        image_url = publicUrl;
      }
      
      const formattedData = {
        ...data,
        image_url
      };
      
      if (initialData) {
        const { error } = await supabase
          .from('services')
          .update({
            ...formattedData,
            updated_at: new Date().toISOString()
          })
          .eq('id', initialData.id);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert([{
            ...formattedData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
          
        if (error) throw error;
      }
      
      toast({
        description: initialData 
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData 
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
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title_en">Title (English)</Label>
              <Input 
                id="title_en"
                {...register('title_en', { required: 'Title in English is required' })}
              />
              {errors.title_en && (
                <p className="text-sm text-destructive">{errors.title_en.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title_ka">Title (Georgian)</Label>
              <Input 
                id="title_ka"
                {...register('title_ka', { required: 'Title in Georgian is required' })}
              />
              {errors.title_ka && (
                <p className="text-sm text-destructive">{errors.title_ka.message?.toString()}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description_en">Description (English)</Label>
              <Textarea 
                id="description_en"
                {...register('description_en', { required: 'Description in English is required' })}
              />
              {errors.description_en && (
                <p className="text-sm text-destructive">{errors.description_en.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description_ka">Description (Georgian)</Label>
              <Textarea 
                id="description_ka"
                {...register('description_ka', { required: 'Description in Georgian is required' })}
              />
              {errors.description_ka && (
                <p className="text-sm text-destructive">{errors.description_ka.message?.toString()}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_description_en">Full Description (English)</Label>
              <Textarea 
                id="full_description_en"
                {...register('full_description_en', { required: 'Full description in English is required' })}
              />
              {errors.full_description_en && (
                <p className="text-sm text-destructive">{errors.full_description_en.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="full_description_ka">Full Description (Georgian)</Label>
              <Textarea 
                id="full_description_ka"
                {...register('full_description_ka', { required: 'Full description in Georgian is required' })}
              />
              {errors.full_description_ka && (
                <p className="text-sm text-destructive">{errors.full_description_ka.message?.toString()}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input 
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-40 h-40 object-cover rounded-md border" 
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {isGeorgian ? 'გაუქმება' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData 
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
