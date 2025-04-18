
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TeamMember } from "@/types/team";

interface TeamMembersTableProps {
  teamMembers: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (member: TeamMember) => void;
  onAdd: () => void;
}

export const TeamMembersTable = ({ teamMembers, onEdit, onDelete, onAdd }: TeamMembersTableProps) => {
  const { isGeorgian } = useLanguage();

  if (!teamMembers.length) {
    return (
      <div className="text-center py-8 bg-muted/20 rounded-md">
        <p className="text-muted-foreground">
          {isGeorgian ? 'გუნდის წევრები არ მოიძებნა' : 'No team members found'}
        </p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={onAdd}
        >
          <Plus className="mr-2 h-4 w-4" />
          {isGeorgian ? 'დაამატეთ პირველი წევრი' : 'Add your first team member'}
        </Button>
      </div>
    );
  }

  return (
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
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(member)}>
                <Pencil className="mr-2 h-4 w-4" />
                {isGeorgian ? 'რედაქტირება' : 'Edit'}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(member)}>
                <Trash2 className="mr-2 h-4 w-4" />
                {isGeorgian ? 'წაშლა' : 'Delete'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
