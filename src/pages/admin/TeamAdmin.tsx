
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
import TeamMemberForm from '@/components/admin/team/TeamMemberForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TeamAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  const queryClient = useQueryClient();
  
  const { data: teamMembers, isLoading, error } = useQuery({
    queryKey: ['admin-team-members'],
    queryFn: async () => {
      console.log('Fetching team members for admin panel');
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index');
      
      if (error) {
        console.error("Error fetching team members:", error);
        throw error;
      }
      console.log('Team members fetched:', data);
      return data || [];
    },
  });

  const handleDelete = async () => {
    if (!memberToDelete) return;
    
    console.log('Deleting team member:', memberToDelete);
    try {
      // Delete the team member record
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberToDelete.id);
        
      if (error) {
        console.error("Error deleting team member:", error);
        throw error;
      }
      
      // If there's an image, delete it from storage
      if (memberToDelete.image_url) {
        try {
          // Extract filename from URL
          const urlParts = memberToDelete.image_url.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const filePath = `team/${fileName}`;
          
          console.log('Deleting image from storage:', filePath);
          
          const { error: storageError } = await supabase.storage
            .from('site-images')
            .remove([filePath]);
            
          if (storageError) {
            console.error("Error deleting image:", storageError);
            // Continue as the team member was deleted
          }
        } catch (imageError) {
          console.error("Error processing image deletion:", imageError);
          // Continue as the team member was deleted
        }
      }
      
      toast({
        description: isGeorgian ? 'გუნდის წევრი წაიშალა' : 'Team member deleted successfully'
      });
      
      // Refresh the team members list
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
    } catch (error: any) {
      console.error('Error deleting team member:', error);
      toast({
        variant: "destructive",
        description: error.message
      });
    } finally {
      setMemberToDelete(null);
    }
  };

  const handleEdit = (member: any) => {
    console.log('Editing team member:', member);
    setEditingMember(JSON.parse(JSON.stringify(member))); // Deep copy
    setIsAddDialogOpen(true);
  };

  const handleFormSuccess = () => {
    console.log('Form submitted successfully');
    setIsAddDialogOpen(false);
    setEditingMember(null);
    queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
  };

  const handleFormClose = () => {
    setIsAddDialogOpen(false);
    setEditingMember(null);
  };

  const handleOpenForm = () => {
    setEditingMember(null);
    setIsAddDialogOpen(true);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="text-lg">{isGeorgian ? 'გუნდის წევრები იტვირთება...' : 'Loading team members...'}</div>
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
            onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-team-members'] })}
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
            {isGeorgian ? 'გუნდი' : 'Team'}
          </h1>
          <Button onClick={handleOpenForm}>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი წევრი' : 'New Member'}
          </Button>
        </div>
        
        {teamMembers && teamMembers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isGeorgian ? 'სურათი' : 'Image'}</TableHead>
                <TableHead>{isGeorgian ? 'სახელი' : 'Name'}</TableHead>
                <TableHead>{isGeorgian ? 'პოზიცია' : 'Title'}</TableHead>
                <TableHead>{isGeorgian ? 'სორტირება' : 'Order'}</TableHead>
                <TableHead className="text-right">{isGeorgian ? 'მოქმედებები' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    {member.image_url ? (
                      <img 
                        src={member.image_url} 
                        alt={member.name_en}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                        N/A
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{isGeorgian ? member.name_ka : member.name_en}</TableCell>
                  <TableCell>{isGeorgian ? member.title_ka : member.title_en}</TableCell>
                  <TableCell>{member.order_index}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(member)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      {isGeorgian ? 'რედაქტირება' : 'Edit'}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setMemberToDelete(member)}>
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
              {isGeorgian ? 'გუნდის წევრები არ მოიძებნა' : 'No team members found'}
            </p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={handleOpenForm}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isGeorgian ? 'დაამატეთ პირველი წევრი' : 'Add your first team member'}
            </Button>
          </div>
        )}

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingMember 
                  ? (isGeorgian ? 'წევრის რედაქტირება' : 'Edit Member') 
                  : (isGeorgian ? 'ახალი წევრი' : 'New Member')}
              </DialogTitle>
            </DialogHeader>
            <TeamMemberForm 
              initialData={editingMember} 
              onSuccess={handleFormSuccess} 
              onCancel={handleFormClose}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!memberToDelete} onOpenChange={(open) => !open && setMemberToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isGeorgian ? 'გსურთ წევრის წაშლა?' : 'Are you sure you want to delete this team member?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isGeorgian 
                  ? 'ეს მოქმედება შეუქცევადია. წევრი სამუდამოდ წაიშლება.'
                  : 'This action cannot be undone. The team member will be permanently deleted.'}
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

const TeamAdmin = () => {
  return (
    <LanguageProvider>
      <TeamAdminContent />
    </LanguageProvider>
  );
};

export default TeamAdmin;
