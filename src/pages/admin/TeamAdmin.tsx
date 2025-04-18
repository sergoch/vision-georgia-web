
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import TeamMemberForm from '@/components/admin/team/TeamMemberForm';
import { TeamMembersTable } from '@/components/admin/team/TeamMembersTable';
import { DeleteTeamMemberDialog } from '@/components/admin/team/DeleteTeamMemberDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { TeamMember } from '@/types/team';

const TeamAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
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
    
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberToDelete.id);
        
      if (error) throw error;
      
      if (memberToDelete.image_url) {
        const urlParts = memberToDelete.image_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `team/${fileName}`;
        
        const { error: storageError } = await supabase.storage
          .from('site-images')
          .remove([filePath]);
          
        if (storageError) {
          console.error("Error deleting image:", storageError);
        }
      }
      
      toast({
        description: isGeorgian ? 'გუნდის წევრი წაიშალა' : 'Team member deleted successfully'
      });
      
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

  const handleFormSuccess = () => {
    setIsAddDialogOpen(false);
    setEditingMember(null);
    queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="text-lg">
            {isGeorgian ? 'გუნდის წევრები იტვირთება...' : 'Loading team members...'}
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
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი წევრი' : 'New Member'}
          </Button>
        </div>
        
        {teamMembers && (
          <TeamMembersTable 
            teamMembers={teamMembers}
            onEdit={setEditingMember}
            onDelete={setMemberToDelete}
            onAdd={() => setIsAddDialogOpen(true)}
          />
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
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <DeleteTeamMemberDialog
          member={memberToDelete}
          onOpenChange={(open) => !open && setMemberToDelete(null)}
          onConfirm={handleDelete}
        />
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
