
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
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
  
  const { data: services, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (service: any) => {
    const serviceCopy = JSON.parse(JSON.stringify(service));
    setSelectedService(serviceCopy);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceToDelete.id);
        
      if (error) throw error;
      
      if (serviceToDelete.image_url) {
        const imagePath = serviceToDelete.image_url.split('/').pop();
        if (imagePath) {
          await supabase.storage
            .from('site-images')
            .remove([`services/${imagePath}`]);
        }
      }
      
      toast({
        description: isGeorgian ? 'სერვისი წაიშალა' : 'Service deleted successfully'
      });
      
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
    queryClient.invalidateQueries({ queryKey: ['admin-services'] });
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedService(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div>Loading...</div>
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
          <Button onClick={() => {
            setSelectedService(null);
            setIsFormOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი სერვისი' : 'New Service'}
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isGeorgian ? 'სათაური' : 'Title'}</TableHead>
              <TableHead>{isGeorgian ? 'აღწერა' : 'Description'}</TableHead>
              <TableHead>{isGeorgian ? 'თარიღი' : 'Date'}</TableHead>
              <TableHead className="text-right">{isGeorgian ? 'მოქმედებები' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{isGeorgian ? service.title_ka : service.title_en}</TableCell>
                <TableCell>{isGeorgian ? service.description_ka : service.description_en}</TableCell>
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

        <ServiceForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
          initialData={selectedService}
        />

        <AlertDialog open={!!serviceToDelete} onOpenChange={() => setServiceToDelete(null)}>
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
