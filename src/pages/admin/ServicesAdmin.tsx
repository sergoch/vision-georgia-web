
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ServiceForm from '@/components/admin/services/ServiceForm';

const ServicesAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [serviceToDelete, setServiceToDelete] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      console.log('Fetching services for admin panel');
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }
      console.log('Services fetched:', data);
      return data || [];
    },
  });

  const handleEdit = (service: any) => {
    console.log('Editing service:', service);
    setSelectedService(JSON.parse(JSON.stringify(service))); // Deep copy
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    
    console.log('Deleting service:', serviceToDelete);
    try {
      // Delete the service record
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceToDelete.id);
        
      if (error) {
        console.error("Error deleting service:", error);
        throw error;
      }
      
      // If there's an image, delete it from storage
      if (serviceToDelete.image_url) {
        try {
          // Extract filename from URL
          const urlParts = serviceToDelete.image_url.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const filePath = `services/${fileName}`;
          
          console.log('Deleting image from storage:', filePath);
          
          const { error: storageError } = await supabase.storage
            .from('site-images')
            .remove([filePath]);
            
          if (storageError) {
            console.error("Error deleting image:", storageError);
            // Continue as the service was deleted
          }
        } catch (imageError) {
          console.error("Error processing image deletion:", imageError);
          // Continue as the service was deleted
        }
      }
      
      toast({
        description: isGeorgian ? 'სერვისი წაიშალა' : 'Service deleted successfully'
      });
      
      // Refresh the services list
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
    } catch (error: any) {
      console.error('Error deleting service:', error);
      toast({
        variant: "destructive",
        description: error.message
      });
    } finally {
      setServiceToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    console.log('Form submitted successfully');
    queryClient.invalidateQueries({ queryKey: ['admin-services'] });
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedService(null);
  };

  const handleOpenForm = () => {
    setSelectedService(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="text-lg">{isGeorgian ? 'სერვისები იტვირთება...' : 'Loading services...'}</div>
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
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-services'] })}
            className="mt-4"
          >
            {isGeorgian ? 'ხელახლა ცდა' : 'Try Again'}
          </Button>
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
          <Button onClick={handleOpenForm}>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი სერვისი' : 'New Service'}
          </Button>
        </div>
        
        {services && services.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isGeorgian ? 'სურათი' : 'Image'}</TableHead>
                <TableHead>{isGeorgian ? 'სათაური' : 'Title'}</TableHead>
                <TableHead>{isGeorgian ? 'აღწერა' : 'Description'}</TableHead>
                <TableHead>{isGeorgian ? 'თარიღი' : 'Date'}</TableHead>
                <TableHead className="text-right">{isGeorgian ? 'მოქმედებები' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {service.image_url ? (
                      <img 
                        src={service.image_url} 
                        alt={service.title_en}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                        N/A
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{isGeorgian ? service.title_ka : service.title_en}</TableCell>
                  <TableCell className="max-w-md truncate">{isGeorgian ? service.description_ka : service.description_en}</TableCell>
                  <TableCell>{new Date(service.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(service)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      {isGeorgian ? 'რედაქტირება' : 'Edit'}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setServiceToDelete(service)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      {isGeorgian ? 'წაშლა' : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 bg-muted/20 rounded-md">
            <p className="text-muted-foreground">
              {isGeorgian ? 'სერვისები არ მოიძებნა' : 'No services found'}
            </p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={handleOpenForm}
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

        <AlertDialog open={!!serviceToDelete} onOpenChange={(open) => !open && setServiceToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isGeorgian ? 'გსურთ სერვისის წაშლა?' : 'Are you sure you want to delete this service?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isGeorgian 
                  ? 'ეს მოქმედება შეუქცევადია. სერვისი სამუდამოდ წაიშლება.'
                  : 'This action cannot be undone. The service will be permanently deleted.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {isGeorgian ? 'გაუქმება' : 'Cancel'}
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                {isGeorgian ? 'წაშლა' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
