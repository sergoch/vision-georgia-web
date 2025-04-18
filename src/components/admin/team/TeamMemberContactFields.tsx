
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";

interface TeamMemberContactFieldsProps {
  register: UseFormRegister<any>;
}

export const TeamMemberContactFields = ({ register }: TeamMemberContactFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          type="email"
          {...register('email')}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
        <Input 
          id="linkedin_url"
          {...register('linkedin_url')}
        />
      </div>
    </div>
  );
};
