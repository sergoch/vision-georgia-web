
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TeamMember } from '@/types/team';

interface UseTeamMemberFormProps {
  initialData?: TeamMember;
  onSuccess: () => void;
}

export const useTeamMemberForm = ({ initialData, onSuccess }: UseTeamMemberFormProps) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url || '');
  const { toast } = useToast();
  const { isGeorgian } = useLanguage();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name_en: '',
      name_ka: '',
      title_en: '',
      title_ka: '',
      bio_en: '',
      bio_ka: '',
      email: '',
      linkedin_url: '',
      order_index: 0
    }
  });

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
        const filePath = `team/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('site-images')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('site-images')
          .getPublicUrl(filePath);
          
        image_url = publicUrl;
      }
      
      if (initialData) {
        const { error } = await supabase
          .from('team_members')
          .update({
            ...data,
            image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', initialData.id);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([{
            ...data,
            image_url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
          
        if (error) throw error;
      }
      
      toast({
        description: initialData 
          ? (isGeorgian ? 'წევრი წარმატებით განახლდა' : 'Member updated successfully') 
          : (isGeorgian ? 'წევრი წარმატებით დაემატა' : 'Member added successfully')
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error saving team member:', error);
      toast({
        variant: "destructive",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    imagePreview,
    handleImageChange,
    onSubmit
  };
};
