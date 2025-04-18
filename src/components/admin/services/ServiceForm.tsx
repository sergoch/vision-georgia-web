
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ServiceFormFields } from './ServiceFormFields';
import { ServiceImageUpload } from './ServiceImageUpload';
import { useServiceForm } from '@/hooks/use-service-form';

interface ServiceFormProps {
  initialData?: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ServiceForm = ({ initialData, isOpen, onClose, onSuccess }: ServiceFormProps) => {
  const { isGeorgian } = useLanguage();
  const { form, loading, imagePreview, handleImageChange, onSubmit } = useServiceForm({
    initialData,
    onSuccess,
    onClose
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !loading) onClose();
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id 
              ? (isGeorgian ? 'სერვისის რედაქტირება' : 'Edit Service')
              : (isGeorgian ? 'ახალი სერვისი' : 'New Service')
            }
          </DialogTitle>
          <DialogDescription>
            {isGeorgian 
              ? 'შეავსეთ ფორმა სერვისის დასამატებლად ან განსაახლებლად' 
              : 'Fill out the form to add or update a service'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ServiceFormFields 
            form={form} 
            errors={form.formState.errors} 
          />
          
          <ServiceImageUpload 
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
          />
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              {isGeorgian ? 'გაუქმება' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData?.id 
                ? (isGeorgian ? 'განახლება' : 'Update') 
                : (isGeorgian ? 'დამატება' : 'Add')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
