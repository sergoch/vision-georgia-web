
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import PageForm from '@/components/admin/pages/PageForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PagesAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<any>(null);
  
  const { data: pages, isLoading, refetch } = useQuery({
    queryKey: ['admin-pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('pages')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      await refetch();
      toast({
        description: isGeorgian 
          ? `გვერდის სტატუსი შეიცვალა` 
          : `Page status has been updated`,
      });
    } catch (error) {
      console.error('Error toggling page status:', error);
      toast({
        variant: "destructive",
        description: isGeorgian 
          ? 'შეცდომა გვერდის სტატუსის შეცვლისას' 
          : 'Error updating page status',
      });
    }
  };

  const deletePage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await refetch();
      toast({
        description: isGeorgian 
          ? 'გვერდი წარმატებით წაიშალა' 
          : 'Page has been deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        variant: "destructive",
        description: isGeorgian 
          ? 'შეცდომა გვერდის წაშლისას' 
          : 'Error deleting page',
      });
    }
  };

  const handleFormSuccess = () => {
    setIsAddDialogOpen(false);
    setEditingPage(null);
    refetch();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div>{isGeorgian ? 'იტვირთება...' : 'Loading...'}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {isGeorgian ? 'გვერდები' : 'Pages'}
          </h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი გვერდი' : 'New Page'}
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isGeorgian ? 'სათაური' : 'Title'}</TableHead>
              <TableHead>{isGeorgian ? 'სლაგი' : 'Slug'}</TableHead>
              <TableHead>{isGeorgian ? 'სტატუსი' : 'Status'}</TableHead>
              <TableHead className="text-right">{isGeorgian ? 'მოქმედებები' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages?.map((page) => (
              <TableRow key={page.id}>
                <TableCell>{isGeorgian ? page.title_ka : page.title_en}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>
                  {page.is_published 
                    ? (isGeorgian ? 'გამოქვეყნებული' : 'Published')
                    : (isGeorgian ? 'დამალული' : 'Draft')}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => togglePublish(page.id, page.is_published)}
                  >
                    {page.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setEditingPage(page)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => deletePage(page.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {isGeorgian ? 'ახალი გვერდი' : 'New Page'}
              </DialogTitle>
            </DialogHeader>
            <PageForm onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {isGeorgian ? 'გვერდის რედაქტირება' : 'Edit Page'}
              </DialogTitle>
            </DialogHeader>
            {editingPage && (
              <PageForm 
                initialData={editingPage} 
                onSuccess={handleFormSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

// Main PagesAdmin component that provides the language context
const PagesAdmin = () => {
  return (
    <LanguageProvider>
      <PagesAdminContent />
    </LanguageProvider>
  );
};

export default PagesAdmin;
