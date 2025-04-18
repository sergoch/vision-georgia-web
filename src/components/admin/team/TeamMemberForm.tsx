
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface TeamMemberFormProps {
  initialData?: any;
  onSuccess: () => void;
}

const TeamMemberForm = ({ initialData, onSuccess }: TeamMemberFormProps) => {
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
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url || '');
  const { toast } = useToast();
  const { isGeorgian } = useLanguage();

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
      // Upload image if it exists
      let image_url = initialData?.image_url || '';
      
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `team/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('site-images')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('site-images')
          .getPublicUrl(filePath);
          
        image_url = publicUrl;
      }
      
      // Save or update team member
      if (initialData) {
        // Update existing member
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
        // Create new member
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name_en">Name (English)</Label>
          <Input 
            id="name_en"
            {...register('name_en', { required: 'Name in English is required' })}
          />
          {errors.name_en && (
            <p className="text-sm text-destructive">{errors.name_en.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name_ka">Name (Georgian)</Label>
          <Input 
            id="name_ka"
            {...register('name_ka', { required: 'Name in Georgian is required' })}
          />
          {errors.name_ka && (
            <p className="text-sm text-destructive">{errors.name_ka.message?.toString()}</p>
          )}
        </div>
      </div>
      
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
          <Label htmlFor="bio_en">Bio (English)</Label>
          <Textarea 
            id="bio_en"
            {...register('bio_en', { required: 'Bio in English is required' })}
          />
          {errors.bio_en && (
            <p className="text-sm text-destructive">{errors.bio_en.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio_ka">Bio (Georgian)</Label>
          <Textarea 
            id="bio_ka"
            {...register('bio_ka', { required: 'Bio in Georgian is required' })}
          />
          {errors.bio_ka && (
            <p className="text-sm text-destructive">{errors.bio_ka.message?.toString()}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            {...register('email')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input 
            id="linkedin_url"
            {...register('linkedin_url')}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="order_index">Display Order</Label>
        <Input 
          id="order_index"
          type="number"
          {...register('order_index', { valueAsNumber: true })}
        />
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
      
      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {initialData 
          ? (isGeorgian ? 'განახლება' : 'Update') 
          : (isGeorgian ? 'დამატება' : 'Add')
        }
      </Button>
    </form>
  );
};

export default TeamMemberForm;
