
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TeamMemberBioFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export const TeamMemberBioFields = ({ register, errors }: TeamMemberBioFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="bio_en">Bio (English)</Label>
        <Textarea 
          id="bio_en"
          {...register('bio_en', { required: 'Bio in English is required' })}
        />
        {errors.bio_en && (
          <p className="text-sm text-destructive">{errors.bio_en.message?.toString()}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio_ka">Bio (Georgian)</Label>
        <Textarea 
          id="bio_ka"
          {...register('bio_ka', { required: 'Bio in Georgian is required' })}
        />
        {errors.bio_ka && (
          <p className="text-sm text-destructive">{errors.bio_ka.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};
