
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import SeoSettingsForm from '@/components/admin/seo/SeoSettingsForm';
import AnalyticsSettings from '@/components/admin/analytics/AnalyticsSettings';
import { useSeoSettings } from '@/hooks/use-seo-settings';
import { useAnalyticsSettings } from '@/hooks/use-analytics-settings';

const DashboardContent = () => {
  const { isGeorgian } = useLanguage();
  const { settings: seoSettings, isLoading: isSeoLoading, updateSettings: updateSeoSettings } = useSeoSettings();
  const { settings: analyticsSettings, updateSettings: updateAnalyticsSettings } = useAnalyticsSettings();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          {isGeorgian ? 'მთავარი დაფა' : 'Dashboard'}
        </h1>
        
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
                {isGeorgian ? 'დაამატეთ, წაშალეთ და შეცვალეთ პროექტები' : 'Add, remove and edit projects'}
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">
                {isGeorgian ? 'სერვისების მართვა' : 'Manage Services'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isGeorgian ? 'დაამატეთ, წაშალეთ და შეცვალეთ სერვისები' : 'Add, remove and edit services'}
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
