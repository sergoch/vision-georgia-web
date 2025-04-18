
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useServices } from '@/hooks/use-services';
import { ServicesTable } from '@/components/admin/services/ServicesTable';
import { DeleteServiceDialog } from '@/components/admin/services/DeleteServiceDialog';
import ServiceForm from '@/components/admin/services/ServiceForm';

const ServicesAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const {
    services,
    isLoading,
    error,
    isFormOpen,
    selectedService,
    serviceToDelete,
    setServiceToDelete,
    setIsFormOpen,
    handleDelete,
    handleEdit,
    handleFormSuccess,
    handleFormClose
  } = useServices();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="text-lg">
            {isGeorgian ? 'სერვისები იტვირთება...' : 'Loading services...'}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-48">
          <div className="text-lg text-red-500 mb-2">
            {isGeorgian ? 'შეცდომა მოხდა' : 'An error occurred'}
          </div>
          <div className="text-sm text-red-400">
            {(error as Error).message}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {isGeorgian ? 'სერვისები' : 'Services'}
          </h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი სერვისი' : 'New Service'}
          </Button>
        </div>
        
        {services && services.length > 0 ? (
          <ServicesTable
            services={services}
            onEdit={handleEdit}
            onDelete={setServiceToDelete}
          />
        ) : (
          <div className="text-center py-8 bg-muted/20 rounded-md">
            <p className="text-muted-foreground">
              {isGeorgian ? 'სერვისები არ მოიძებნა' : 'No services found'}
            </p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => setIsFormOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isGeorgian ? 'დაამატეთ პირველი სერვისი' : 'Add your first service'}
            </Button>
          </div>
        )}

        <ServiceForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
          initialData={selectedService}
        />

        <DeleteServiceDialog
          isOpen={!!serviceToDelete}
          onClose={() => setServiceToDelete(null)}
          onConfirm={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

const ServicesAdmin = () => {
  return (
    <LanguageProvider>
      <ServicesAdminContent />
    </LanguageProvider>
  );
};

export default ServicesAdmin;
