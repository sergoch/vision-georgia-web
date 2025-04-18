
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const ProjectsAdmin = () => {
  const { isGeorgian } = useLanguage();
  
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
          <Button>
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
                  <Button variant="outline" size="sm" className="mr-2">
                    {isGeorgian ? 'რედაქტირება' : 'Edit'}
                  </Button>
                  <Button variant="destructive" size="sm">
                    {isGeorgian ? 'წაშლა' : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ProjectsAdmin;
