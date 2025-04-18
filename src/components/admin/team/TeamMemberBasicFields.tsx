
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TeamMemberBasicFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export const TeamMemberBasicFields = ({ register, errors }: TeamMemberBasicFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name_en">Name (English)</Label>
          <Input 
            id="name_en"
            {...register('name_en', { required: 'Name in English is required' })}
          />
          {errors.name_en && (
            <p className="text-sm text-destructive">{errors.name_en.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name_ka">Name (Georgian)</Label>
          <Input 
            id="name_ka"
            {...register('name_ka', { required: 'Name in Georgian is required' })}
          />
          {errors.name_ka && (
            <p className="text-sm text-destructive">{errors.name_ka.message?.toString()}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title_en">Title (English)</Label>
          <Input 
            id="title_en"
            {...register('title_en', { required: 'Title in English is required' })}
          />
          {errors.title_en && (
            <p className="text-sm text-destructive">{errors.title_en.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title_ka">Title (Georgian)</Label>
          <Input 
            id="title_ka"
            {...register('title_ka', { required: 'Title in Georgian is required' })}
          />
          {errors.title_ka && (
            <p className="text-sm text-destructive">{errors.title_ka.message?.toString()}</p>
          )}
        </div>
      </div>
    </>
  );
};
