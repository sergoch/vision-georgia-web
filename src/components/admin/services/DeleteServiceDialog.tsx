
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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

interface DeleteServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteServiceDialog: React.FC<DeleteServiceDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  const { isGeorgian } = useLanguage();

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            {isGeorgian ? 'წაშლა' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
