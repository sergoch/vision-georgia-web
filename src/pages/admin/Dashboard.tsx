
import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut, LogIn } from 'lucide-react';

import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import SeoSettingsForm from '@/components/admin/seo/SeoSettingsForm';
import AnalyticsSettings from '@/components/admin/analytics/AnalyticsSettings';
import { useSeoSettings } from '@/hooks/use-seo-settings';
import { useAnalyticsSettings } from '@/hooks/use-analytics-settings';

const DashboardContent = () => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const { settings: seoSettings, isLoading: isSeoLoading, updateSettings: updateSeoSettings } = useSeoSettings();
  const { settings: analyticsSettings, updateSettings: updateAnalyticsSettings } = useAnalyticsSettings();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        description: isGeorgian ? 'გამოსვლა წარმატებით განხორციელდა' : 'Logged out successfully'
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {isGeorgian ? 'მთავარი დაფა' : 'Dashboard'}
          </h1>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="absolute top-0 right-0"
          >
            <LogOut className="mr-2" />
            {isGeorgian ? 'გამოსვლა' : 'Logout'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {seoSettings && (
            <SeoSettingsForm 
              settings={seoSettings}
              onSubmit={updateSeoSettings}
            />
          )}

          {analyticsSettings && (
            <AnalyticsSettings 
              settings={analyticsSettings}
              onSubmit={updateAnalyticsSettings}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">
                {isGeorgian ? 'პროექტების მართვა' : 'Manage Projects'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isGeorgian ? 'დაამატეთ, წაშალეთ და შეცვლეთ პროექტები' : 'Add, remove and edit projects'}
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">
                {isGeorgian ? 'სერვისების მართვა' : 'Manage Services'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isGeorgian ? 'დაამატეთ, წაშალეთ და შეცვლეთ სერვისები' : 'Add, remove and edit services'}
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">
                {isGeorgian ? 'პარამეტრები' : 'Settings'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isGeorgian ? 'მართეთ საიტის პარამეტრები' : 'Manage website settings'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Main Dashboard component that provides the language context
const Dashboard = () => {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
};

export default Dashboard;
