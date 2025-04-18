
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { TeamMemberBasicFields } from './TeamMemberBasicFields';
import { TeamMemberBioFields } from './TeamMemberBioFields';
import { TeamMemberContactFields } from './TeamMemberContactFields';
import { TeamMemberImageUpload } from './TeamMemberImageUpload';
import { useTeamMemberForm } from '@/hooks/use-team-member-form';
import type { TeamMember } from '@/types/team';

interface TeamMemberFormProps {
  initialData?: TeamMember;
  onSuccess: () => void;
  onCancel?: () => void;
}

const TeamMemberForm = ({ initialData, onSuccess, onCancel }: TeamMemberFormProps) => {
  const { isGeorgian } = useLanguage();
  const {
    register,
    handleSubmit,
    errors,
    loading,
    imagePreview,
    handleImageChange,
    onSubmit
  } = useTeamMemberForm({ initialData, onSuccess });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TeamMemberBasicFields register={register} errors={errors} />
      <TeamMemberBioFields register={register} errors={errors} />
      <TeamMemberContactFields register={register} />
      <TeamMemberImageUpload
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
      />
      
      <div className="flex space-x-3 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {isGeorgian ? 'გაუქმება' : 'Cancel'}
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData 
            ? (isGeorgian ? 'განახლება' : 'Update') 
            : (isGeorgian ? 'დამატება' : 'Add')
          }
        </Button>
      </div>
    </form>
  );
};

export default TeamMemberForm;
