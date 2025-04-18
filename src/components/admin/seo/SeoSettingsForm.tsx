
import { useForm } from "react-hook-form";
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface SeoSettingsFormProps {
  settings: {
    site_title: string;
    site_description_en: string;
    site_description_ka: string;
    site_keywords: string;
    og_image_url?: string;
    twitter_handle?: string;
  };
  onSubmit: (data: any) => void;
}

const SeoSettingsForm = ({ settings, onSubmit }: SeoSettingsFormProps) => {
  const { isGeorgian } = useLanguage();
  const form = useForm({
    defaultValues: settings
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isGeorgian ? 'SEO პარამეტრები' : 'SEO Settings'}
        </CardTitle>
        <CardDescription>
          {isGeorgian 
            ? 'მართეთ თქვენი ვებსაიტის SEO პარამეტრები' 
            : 'Manage your website\'s SEO settings'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="site_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isGeorgian ? 'საიტის სათაური' : 'Site Title'}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="site_description_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isGeorgian ? 'აღწერა (ინგლისურად)' : 'Description (English)'}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="site_description_ka"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isGeorgian ? 'აღწერა (ქართულად)' : 'Description (Georgian)'}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="site_keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isGeorgian ? 'საკვანძო სიტყვები' : 'Keywords'}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="engineering, geodesy, GIS, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="og_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter_handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Handle</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="@yourusername" />
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
      </CardContent>
    </Card>
  );
};

export default SeoSettingsForm;
