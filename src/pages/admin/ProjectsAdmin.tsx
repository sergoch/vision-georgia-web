
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
import ProjectForm from '@/components/admin/projects/ProjectForm';

const ProjectsAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id);
        
      if (error) throw error;
      
      // If project has an image, delete it from storage
      if (projectToDelete.image_url) {
        const imagePath = projectToDelete.image_url.split('/').pop();
        if (imagePath) {
          await supabase.storage
            .from('site-images')
            .remove([`projects/${imagePath}`]);
        }
      }
      
      toast({
        description: isGeorgian ? 'პროექტი წაიშალა' : 'Project deleted successfully'
      });
      
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast({
        variant: "destructive",
        description: error.message
      });
    } finally {
      setProjectToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedProject(null);
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
            {isGeorgian ? 'პროექტები' : 'Projects'}
          </h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი პროექტი' : 'New Project'}
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isGeorgian ? 'სათაური' : 'Title'}</TableHead>
              <TableHead>{isGeorgian ? 'კატეგორია' : 'Category'}</TableHead>
              <TableHead>{isGeorgian ? 'თარიღი' : 'Date'}</TableHead>
              <TableHead className="text-right">{isGeorgian ? 'მოქმედებები' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{isGeorgian ? project.title_ka : project.title_en}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(project)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    {isGeorgian ? 'რედაქტირება' : 'Edit'}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setProjectToDelete(project)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isGeorgian ? 'წაშლა' : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ProjectForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
          initialData={selectedProject}
        />

        <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isGeorgian ? 'გსურთ პროექტის წაშლა?' : 'Are you sure you want to delete this project?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isGeorgian 
                  ? 'ეს მოქმედება შეუქცევადია. პროექტი სამუდამოდ წაიშლება.'
                  : 'This action cannot be undone. The project will be permanently deleted.'}
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

// Main ProjectsAdmin component that provides the language context
const ProjectsAdmin = () => {
  return (
    <LanguageProvider>
      <ProjectsAdminContent />
    </LanguageProvider>
  );
};

export default ProjectsAdmin;
