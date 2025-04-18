
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeamMemberImageUploadProps {
  imagePreview: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TeamMemberImageUpload = ({ imagePreview, onImageChange }: TeamMemberImageUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="image">Image</Label>
      <Input 
        id="image"
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      {imagePreview && (
        <div className="mt-2">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-40 h-40 object-cover rounded-md border" 
          />
        </div>
      )}
    </div>
  );
};
