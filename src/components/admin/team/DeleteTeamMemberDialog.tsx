
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
import { useLanguage } from "@/contexts/LanguageContext";
import type { TeamMember } from "@/types/team";

interface DeleteTeamMemberDialogProps {
  member: TeamMember | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteTeamMemberDialog = ({ 
  member, 
  onOpenChange, 
  onConfirm 
}: DeleteTeamMemberDialogProps) => {
  const { isGeorgian } = useLanguage();

  return (
    <AlertDialog open={!!member} onOpenChange={onOpenChange}>
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
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            {isGeorgian ? 'წაშლა' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
