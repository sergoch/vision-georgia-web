
import { useForm } from "react-hook-form";
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface CeoInfoFormProps {
  initialData: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const CeoInfoForm = ({ initialData, onSubmit, isLoading }: CeoInfoFormProps) => {
  const { isGeorgian } = useLanguage();
  const form = useForm({
    defaultValues: initialData
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isGeorgian ? 'გენერალური დირექტორის ინფორმაცია' : 'CEO Information'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{isGeorgian ? 'სახელი (ინგლისურად)' : 'Name (English)'}</Label>
              <Input {...form.register('name_en')} />
            </div>
            <div className="space-y-2">
              <Label>{isGeorgian ? 'სახელი (ქართულად)' : 'Name (Georgian)'}</Label>
              <Input {...form.register('name_ka')} />
            </div>
            <div className="space-y-2">
              <Label>{isGeorgian ? 'თანამდებობა (ინგლისურად)' : 'Title (English)'}</Label>
              <Input {...form.register('title_en')} />
            </div>
            <div className="space-y-2">
              <Label>{isGeorgian ? 'თანამდებობა (ქართულად)' : 'Title (Georgian)'}</Label>
              <Input {...form.register('title_ka')} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>{isGeorgian ? 'ბიოგრაფია (ინგლისურად)' : 'Biography (English)'}</Label>
            <Textarea {...form.register('bio_en')} rows={4} />
          </div>
          
          <div className="space-y-2">
            <Label>{isGeorgian ? 'ბიოგრაფია (ქართულად)' : 'Biography (Georgian)'}</Label>
            <Textarea {...form.register('bio_ka')} rows={4} />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGeorgian ? 'შენახვა' : 'Save'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CeoInfoForm;
