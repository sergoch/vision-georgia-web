
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Upload } from "lucide-react";

interface TeamMemberFormProps {
  initialData?: {
    id?: string;
    name_en: string;
    name_ka: string;
    title_en: string;
    title_ka: string;
    bio_en: string;
    bio_ka: string;
    image_url: string;
    email?: string;
    linkedin_url?: string;
    order_index: number;
  };
  onSuccess?: () => void;
}

const TeamMemberForm = ({ initialData, onSuccess }: TeamMemberFormProps) => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const isEditing = !!initialData;

  const form = useForm({
    defaultValues: initialData || {
      name_en: "",
      name_ka: "",
      title_en: "",
      title_ka: "",
      bio_en: "",
      bio_ka: "",
      image_url: "",
      email: "",
      linkedin_url: "",
      order_index: 0,
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `team/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(filePath);

      form.setValue('image_url', publicUrl);
      toast({
        description: isGeorgian ? 'სურათი აიტვირთა' : 'Image uploaded successfully'
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        description: isGeorgian 
          ? 'შეცდომა სურათის ატვირთვისას' 
          : 'Error uploading image'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('team_members')
          .update(data)
          .eq('id', initialData.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([data]);
        
        if (error) throw error;
      }

      toast({
        description: isGeorgian 
          ? 'გუნდის წევრი წარმატებით შეინახა' 
          : 'Team member saved successfully'
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        description: isGeorgian 
          ? 'შეცდომა მონაცემების შენახვისას' 
          : 'Error saving data'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isGeorgian ? 'სახელი (ინგლისურად)' : 'Name (English)'}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name_ka"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isGeorgian ? 'სახელი (ქართულად)' : 'Name (Georgian)'}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isGeorgian ? 'პოზიცია (ინგლისურად)' : 'Title (English)'}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title_ka"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isGeorgian ? 'პოზიცია (ქართულად)' : 'Title (Georgian)'}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isGeorgian ? 'სურათი' : 'Image'}</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input {...field} placeholder="Image URL" />
                  <div className="flex items-center gap-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      disabled={isUploading}
                      onClick={() => document.getElementById('imageUpload')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isGeorgian ? 'სურათის ატვირთვა' : 'Upload Image'}
                    </Button>
                    {field.value && (
                      <img 
                        src={field.value} 
                        alt="Preview" 
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bio_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isGeorgian ? 'ბიოგრაფია (ინგლისურად)' : 'Bio (English)'}</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio_ka"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isGeorgian ? 'ბიოგრაფია (ქართულად)' : 'Bio (Georgian)'}</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="order_index"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isGeorgian ? 'სორტირების ინდექსი' : 'Order Index'}</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            {isGeorgian ? 'შენახვა' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeamMemberForm;
