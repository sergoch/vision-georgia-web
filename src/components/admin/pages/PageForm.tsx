
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PageFormProps {
  initialData?: {
    id?: string;
    title_en: string;
    title_ka: string;
    content_en: string;
    content_ka: string;
    slug: string;
    meta_description_en?: string;
    meta_description_ka?: string;
  };
  onSuccess?: () => void;
}

const PageForm = ({ initialData, onSuccess }: PageFormProps) => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const isEditing = !!initialData;

  const form = useForm({
    defaultValues: initialData || {
      title_en: "",
      title_ka: "",
      content_en: "",
      content_ka: "",
      slug: "",
      meta_description_en: "",
      meta_description_ka: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('pages')
          .update(data)
          .eq('id', initialData.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pages')
          .insert([data]);
        
        if (error) throw error;
      }

      toast({
        description: isGeorgian 
          ? 'გვერდი წარმატებით შეინახა' 
          : 'Page saved successfully'
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        description: isGeorgian 
          ? 'შეცდომა გვერდის შენახვისას' 
          : 'Error saving page'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title_en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isGeorgian ? 'სათაური (ინგლისურად)' : 'Title (English)'}</FormLabel>
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
              <FormLabel>{isGeorgian ? 'სათაური (ქართულად)' : 'Title (Georgian)'}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content_en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isGeorgian ? 'კონტენტი (ინგლისურად)' : 'Content (English)'}</FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content_ka"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isGeorgian ? 'კონტენტი (ქართულად)' : 'Content (Georgian)'}</FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} />
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

export default PageForm;
