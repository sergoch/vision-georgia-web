
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

interface ContactPageFormProps {
  initialData?: {
    id: string;
    content_en: Record<string, string>;
    content_ka: Record<string, string>;
  };
}

type FormValues = {
  content_en: Record<string, string>;
  content_ka: Record<string, string>;
};

const ContactPageForm = ({ initialData }: ContactPageFormProps) => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const defaultValues: FormValues = {
    content_en: initialData?.content_en || {},
    content_ka: initialData?.content_ka || {},
  };

  const form = useForm<FormValues>({
    defaultValues,
  });

  const { mutate: updateContactPage, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const { error } = await supabase
        .from('contact_info')
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
      queryClient.invalidateQueries({ queryKey: ['admin-contact-page'] });
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
    updateContactPage(data);
  };

  // Define the fields to edit based on the JSON structure
  const contactFields = [
    'page_title', 'page_description', 'contact_info_title', 'address',
    'email', 'phone', 'company_details_title', 'company_id', 
    'bank_code', 'account_number'
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">English Content</h2>
            {contactFields.map((key) => (
              <FormField
                key={`en-${key}`}
                control={form.control}
                name={`content_en.${key}` as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key.replace(/_/g, ' ')}</FormLabel>
                    <Input {...field} value={field.value as string} />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Georgian Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">ქართული კონტენტი</h2>
            {contactFields.map((key) => (
              <FormField
                key={`ka-${key}`}
                control={form.control}
                name={`content_ka.${key}` as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key.replace(/_/g, ' ')}</FormLabel>
                    <Input {...field} value={field.value as string} />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isGeorgian ? 'განახლება' : 'Update'}
        </Button>
      </form>
    </Form>
  );
};

export default ContactPageForm;
