
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SpecialPageFormProps {
  pageId: 'home' | 'contact';
  initialData?: {
    hero_title_en: string;
    hero_title_ka: string;
    hero_subtitle_en?: string;
    hero_subtitle_ka?: string;
    content_en: string;
    content_ka: string;
    meta_description_en?: string;
    meta_description_ka?: string;
  };
  onSuccess?: () => void;
}

const SpecialPageForm = ({ pageId, initialData, onSuccess }: SpecialPageFormProps) => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: initialData || {
      hero_title_en: "",
      hero_title_ka: "",
      hero_subtitle_en: "",
      hero_subtitle_ka: "",
      content_en: "",
      content_ka: "",
      meta_description_en: "",
      meta_description_ka: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase
        .from('special_pages')
        .update(data)
        .eq('id', pageId);
      
      if (error) throw error;

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
          name="hero_title_en"
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
          name="hero_title_ka"
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
          name="hero_subtitle_en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isGeorgian ? 'ქვესათაური (ინგლისურად)' : 'Subtitle (English)'}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hero_subtitle_ka"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isGeorgian ? 'ქვესათაური (ქართულად)' : 'Subtitle (Georgian)'}</FormLabel>
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

export default SpecialPageForm;
