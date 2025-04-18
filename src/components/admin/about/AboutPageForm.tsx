
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AboutPageFormProps {
  initialData?: {
    id: string;
    content_en: Record<string, string>;
    content_ka: Record<string, string>;
  };
}

type FormValues = {
  content_en: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    quality: string;
    innovation: string;
    professionalism: string;
    timeliness: string;
    coreValues: string;
    quality_title: string;
    innovation_title: string;
    professionalism_title: string;
    timeliness_title: string;
  };
  content_ka: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    quality: string;
    innovation: string;
    professionalism: string;
    timeliness: string;
    coreValues: string;
    quality_title: string;
    innovation_title: string;
    professionalism_title: string;
    timeliness_title: string;
  };
};

const AboutPageForm = ({ initialData }: AboutPageFormProps) => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const defaultValues = {
    content_en: initialData?.content_en || {},
    content_ka: initialData?.content_ka || {},
  };

  const form = useForm<FormValues>({
    defaultValues,
  });

  const { mutate: updateAboutPage, isLoading } = useMutation({
    mutationFn: async (data: FormValues) => {
      const { error } = await supabase
        .from('about_page')
        .update({
          content_en: data.content_en,
          content_ka: data.content_ka,
        })
        .eq('id', initialData?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: isGeorgian ? 'წარმატებით განახლდა' : 'Updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-about-page'] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: isGeorgian ? 'შეცდომა' : 'Error',
        description: error.message,
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    updateAboutPage(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">English Content</h2>
            {Object.keys(defaultValues.content_en).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={`content_en.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key}</FormLabel>
                    <Textarea {...field} />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Georgian Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">ქართული კონტენტი</h2>
            {Object.keys(defaultValues.content_ka).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={`content_ka.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key}</FormLabel>
                    <Textarea {...field} />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isGeorgian ? 'განახლება' : 'Update'}
        </Button>
      </form>
    </Form>
  );
};

export default AboutPageForm;
