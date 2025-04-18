
import { useForm } from "react-hook-form";
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AnalyticsSettingsProps {
  settings: {
    tracking_id: string;
    is_enabled: boolean;
  };
  onSubmit: (data: any) => void;
}

const AnalyticsSettings = ({ settings, onSubmit }: AnalyticsSettingsProps) => {
  const { isGeorgian } = useLanguage();
  const form = useForm({
    defaultValues: settings
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isGeorgian ? 'Google Analytics პარამეტრები' : 'Google Analytics Settings'}
        </CardTitle>
        <CardDescription>
          {isGeorgian 
            ? 'შეიყვანეთ თქვენი Google Analytics-ის მონაცემები' 
            : 'Enter your Google Analytics tracking information'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>{isGeorgian ? 'თრექინგის ID' : 'Tracking ID'}</Label>
            <Input 
              {...form.register('tracking_id')} 
              placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="analytics-enabled"
              checked={form.watch('is_enabled')}
              onCheckedChange={(checked) => form.setValue('is_enabled', checked)}
            />
            <Label htmlFor="analytics-enabled">
              {isGeorgian ? 'Analytics ჩართულია' : 'Enable Analytics'}
            </Label>
          </div>

          <Button type="submit">
            {isGeorgian ? 'შენახვა' : 'Save'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSettings;
