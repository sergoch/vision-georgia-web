
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import CeoInfoForm from '@/components/admin/ceo/CeoInfoForm';
import AnalyticsSettings from '@/components/admin/analytics/AnalyticsSettings';
import { useCeoInfo } from '@/hooks/use-ceo-info';
import { useAnalyticsSettings } from '@/hooks/use-analytics-settings';
import { Card } from '@/components/ui/card';

// Create a separate component for the dashboard content
// This will be wrapped with the LanguageProvider
const DashboardContent = () => {
  const { isGeorgian } = useLanguage();
  const { ceoInfo, isLoading: isCeoLoading, handleUpdate: updateCeoInfo } = useCeoInfo();
  const { settings, updateSettings } = useAnalyticsSettings();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          {isGeorgian ? 'მთავარი დაფა' : 'Dashboard'}
        </h1>
        
        <div className="grid grid-cols-1 gap-6">
          {ceoInfo && (
            <CeoInfoForm 
              initialData={ceoInfo}
              onSubmit={updateCeoInfo}
              isLoading={isCeoLoading}
            />
          )}

          {settings && (
            <AnalyticsSettings 
              settings={settings}
              onSubmit={updateSettings}
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
