
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
  
  const { data: teamMembers, isLoading, refetch } = useQuery({
    queryKey: ['admin-team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await refetch();
      toast({
        description: isGeorgian 
          ? 'გუნდის წევრი წარმატებით წაიშალა' 
          : 'Team member has been deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        variant: "destructive",
        description: isGeorgian 
          ? 'შეცდომა გუნდის წევრის წაშლისას' 
          : 'Error deleting team member',
      });
    }
  };

  const handleFormSuccess = () => {
    setIsAddDialogOpen(false);
    setEditingMember(null);
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
            {isGeorgian ? 'გუნდი' : 'Team'}
          </h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი წევრი' : 'New Member'}
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isGeorgian ? 'სახელი' : 'Name'}</TableHead>
              <TableHead>{isGeorgian ? 'პოზიცია' : 'Title'}</TableHead>
              <TableHead>{isGeorgian ? 'სორტირება' : 'Order'}</TableHead>
              <TableHead className="text-right">{isGeorgian ? 'მოქმედებები' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers?.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{isGeorgian ? member.name_ka : member.name_en}</TableCell>
                <TableCell>{isGeorgian ? member.title_ka : member.title_en}</TableCell>
                <TableCell>{member.order_index}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setEditingMember(member)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => deleteMember(member.id)}
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
                {isGeorgian ? 'ახალი წევრი' : 'New Member'}
              </DialogTitle>
            </DialogHeader>
            <TeamMemberForm onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {isGeorgian ? 'წევრის რედაქტირება' : 'Edit Member'}
              </DialogTitle>
            </DialogHeader>
            {editingMember && (
              <TeamMemberForm 
                initialData={editingMember} 
                onSuccess={handleFormSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
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
